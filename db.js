/**
 * =====================================================
 * DATA LAYER - PostgreSQL or JSON file
 * =====================================================
 *
 * - If the DATABASE_URL environment variable is set,
 *   uses PostgreSQL (e.g., Neon, Supabase, Render).
 * - Otherwise, uses a local file (data/produtos.json),
 *   ideal for development.
 *
 * To enable SSL on PostgreSQL, set PGSSL=true
 * (required on hosts like Neon and Supabase).
 * ===================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { Pool } = require('pg');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'produtos.json');

const COLS = 'id, nome, preco, categoria, dosagem, forma_apresentacao, armazenamento, prazo_validade, imagem, descricao_completa';

async function obterProdutosPadrao() {
    const code = fs.readFileSync(path.join(__dirname, 'produtos-data.js'), 'utf8') +
        '\nthis.__obter = () => produtos; this.__promise = PRODUTOS_PROMISE;';
    const sandbox = {
        localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
        fetch: () => Promise.resolve({ ok: false }),
        console,
        JSON,
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    await sandbox.__promise;
    const produtos = sandbox.__obter();
    return Array.isArray(produtos) ? produtos : [];
}

function gerarId(nome) {
    let id = String(nome)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return id || 'product';
}

function montarProduto(dados) {
    return {
        id: dados.id,
        preco: Number(dados.preco) || 0,
        nome: dados.nome,
        categoria: dados.categoria,
        dosagem: dados.dosagem || '',
        formaApresentacao: dados.formaApresentacao || '',
        armazenamento: dados.armazenamento || '',
        prazoValidade: dados.prazoValidade || '',
        imagem: dados.imagem || '',
        descricaoCompleta: dados.descricaoCompleta,
    };
}

function rowParaProduto(r) {
    return {
        id: r.id,
        preco: Number(r.preco),
        nome: r.nome,
        categoria: r.categoria,
        dosagem: r.dosagem,
        formaApresentacao: r.forma_apresentacao,
        armazenamento: r.armazenamento,
        prazoValidade: r.prazo_validade,
        imagem: r.imagem,
        descricaoCompleta: r.descricao_completa,
    };
}

function erro(status, mensagem) {
    const err = new Error(mensagem);
    err.status = status;
    return err;
}

module.exports = async function criarDb(opcoes = {}) {
    const pool = opcoes.pool || (process.env.DATABASE_URL ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined
    }) : null);

    /* ---------- Initialization (table / file + seed) ---------- */
    if (pool) {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS produtos (
                id TEXT PRIMARY KEY,
                nome TEXT NOT NULL,
                preco NUMERIC NOT NULL DEFAULT 0,
                categoria TEXT NOT NULL,
                dosagem TEXT NOT NULL DEFAULT '',
                forma_apresentacao TEXT NOT NULL DEFAULT '',
                armazenamento TEXT NOT NULL DEFAULT '',
                prazo_validade TEXT NOT NULL DEFAULT '',
                imagem TEXT NOT NULL DEFAULT '',
                descricao_completa TEXT NOT NULL
            )
        `);

        const { rows } = await pool.query('SELECT COUNT(*)::int AS total FROM produtos');
        if (rows[0].total === 0) {
            const padrao = await obterProdutosPadrao();
            for (const p of padrao) {
                await pool.query(
                    `INSERT INTO produtos (${COLS}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                    [p.id, p.nome, p.preco, p.categoria, p.dosagem, p.formaApresentacao, p.armazenamento, p.prazoValidade, p.imagem, p.descricaoCompleta]
                );
            }
        }
    } else if (!fs.existsSync(DATA_FILE)) {
        salvarJson(await obterProdutosPadrao());
    }

    /* ---------- JSON file ---------- */
    function lerJson() {
        if (!fs.existsSync(DATA_FILE)) return [];
        try {
            return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        } catch (e) {
            return [];
        }
    }

    function salvarJson(lista) {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify(lista, null, 4), 'utf8');
    }

    /* ---------- Operations ---------- */
    async function listarProdutos() {
        if (pool) {
            const { rows } = await pool.query(`SELECT ${COLS} FROM produtos ORDER BY nome`);
            return rows.map(rowParaProduto);
        }
        return lerJson();
    }

    async function criarProduto(dados) {
        const novo = montarProduto({ ...dados, id: dados.id || gerarId(dados.nome) });

        if (pool) {
            const existe = await pool.query('SELECT 1 FROM produtos WHERE id = $1', [novo.id]);
            if (existe.rows.length > 0) throw erro(409, 'A product with this ID already exists');

            await pool.query(
                `INSERT INTO produtos (${COLS}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [novo.id, novo.nome, novo.preco, novo.categoria, novo.dosagem, novo.formaApresentacao, novo.armazenamento, novo.prazoValidade, novo.imagem, novo.descricaoCompleta]
            );
            return novo;
        }

        const lista = lerJson();
        if (lista.some(p => p.id === novo.id)) throw erro(409, 'A product with this ID already exists');
        lista.push(novo);
        salvarJson(lista);
        return novo;
    }

    async function atualizarProduto(id, dados) {
        const valores = montarProduto({ id, ...dados });

        if (pool) {
            const res = await pool.query(
                `UPDATE produtos SET nome=$2, preco=$3, categoria=$4, dosagem=$5, forma_apresentacao=$6, armazenamento=$7, prazo_validade=$8, imagem=$9, descricao_completa=$10 WHERE id=$1`,
                [id, valores.nome, valores.preco, valores.categoria, valores.dosagem, valores.formaApresentacao, valores.armazenamento, valores.prazoValidade, valores.imagem, valores.descricaoCompleta]
            );
            if (res.rowCount === 0) throw erro(404, 'Product not found');
            return valores;
        }

        const lista = lerJson();
        const index = lista.findIndex(p => p.id === id);
        if (index === -1) throw erro(404, 'Product not found');
        lista[index] = valores;
        salvarJson(lista);
        return valores;
    }

    async function removerProduto(id) {
        if (pool) {
            const res = await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
            if (res.rowCount === 0) throw erro(404, 'Product not found');
            return { ok: true };
        }

        const lista = lerJson();
        const nova = lista.filter(p => p.id !== id);
        if (nova.length === lista.length) throw erro(404, 'Product not found');
        salvarJson(nova);
        return { ok: true };
    }

    return {
        usarPostgres: !!pool,
        listarProdutos,
        criarProduto,
        atualizarProduto,
        removerProduto
    };
};