/**
 * =====================================================
 * SERVIDOR NORDIVIA - API e arquivos estáticos
 * =====================================================
 *
 * Para rodar:  npm install  e depois  npm start
 * O site fica disponível em http://localhost:3000
 *
 * Configuração via variáveis de ambiente (opcional):
 * - PORT          porta do servidor (padrão 3000)
 * - DATABASE_URL  URL do PostgreSQL (ex.: Neon/Supabase).
 *                 Se ausente, usa arquivo JSON local.
 * - PGSSL=true    habilita SSL no PostgreSQL
 * - ADMIN_USUARIO usuário do admin (padrão "admin")
 * - ADMIN_SENHA   senha do admin (padrão "nordivia2024")
 * ===================================================== */

const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const criarDb = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_USUARIO = process.env.ADMIN_USUARIO || 'admin';
const ADMIN_SENHA = process.env.ADMIN_SENHA || 'nordivia2024';

const tokens = new Set();

app.use(express.json());
app.use(express.static(__dirname));

function autenticado(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!tokens.has(token)) {
        return res.status(401).json({ erro: 'Não autorizado' });
    }
    next();
}

function handler(fn) {
    return async function (req, res) {
        try {
            await fn(req, res);
        } catch (e) {
            const status = e.status || 500;
            if (status === 500) {
                console.error('Erro na API:', e);
            }
            res.status(status).json({ erro: status === 500 ? 'Erro interno do servidor' : e.message });
        }
    };
}

/* =====================================================
   AUTENTICAÇÃO
   ===================================================== */
app.post('/api/login', (req, res) => {
    const { usuario, senha } = req.body || {};
    if (usuario === ADMIN_USUARIO && senha === ADMIN_SENHA) {
        const token = crypto.randomUUID();
        tokens.add(token);
        return res.json({ token });
    }
    res.status(401).json({ erro: 'Usuário ou senha incorretos' });
});

/* =====================================================
   PRODUTOS
   ===================================================== */
app.get('/api/produtos', handler(async (req, res) => {
    res.json(await db.listarProdutos());
}));

app.post('/api/produtos', autenticado, handler(async (req, res) => {
    const dados = req.body || {};
    if (!dados.nome || !dados.categoria || !dados.descricaoCompleta) {
        return res.status(400).json({ erro: 'Dados incompletos' });
    }
    const novo = await db.criarProduto(dados);
    res.status(201).json(novo);
}));

app.put('/api/produtos/:id', autenticado, handler(async (req, res) => {
    const atualizado = await db.atualizarProduto(req.params.id, req.body || {});
    res.json(atualizado);
}));

app.delete('/api/produtos/:id', autenticado, handler(async (req, res) => {
    res.json(await db.removerProduto(req.params.id));
}));

let db;

async function iniciar() {
    db = await criarDb();
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Banco de dados: ${db.usarPostgres ? 'PostgreSQL' : 'arquivo JSON local'}`);
    });
}

iniciar().catch(err => {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);
});