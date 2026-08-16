/**
 * Teste da camada de dados usando PostgreSQL em memória (pg-mem).
 * Roda com: npm run test:db
 */

const { newDb } = require('pg-mem');
const criarDb = require('./db');

(async function () {
    const memoria = newDb();
    const { Pool } = memoria.adapters.createPg();
    const db = await criarDb({ pool: new Pool() });

    if (!db.usarPostgres) throw new Error('Deveria estar usando PostgreSQL');

    const lista = await db.listarProdutos();
    console.log('Seed:', lista.length, 'produtos');
    if (lista.length !== 36) throw new Error('Falha no seed: esperado 36');

    const novo = await db.criarProduto({
        nome: 'Teste Postgres',
        preco: 123.45,
        categoria: 'Teste',
        dosagem: '1mg',
        formaApresentacao: 'Pó',
        armazenamento: 'Refrigerado',
        prazoValidade: '24 meses',
        imagem: './img/hero.png',
        descricaoCompleta: 'Produto criado via PostgreSQL.'
    });
    console.log('Criado:', novo.id, '-', novo.nome);
    if (novo.id !== 'teste-postgres') throw new Error('Falha no id gerado');

    const atualizado = await db.atualizarProduto(novo.id, {
        nome: 'Teste Editado',
        preco: 200,
        categoria: 'Teste',
        descricaoCompleta: 'Editado.'
    });
    console.log('Atualizado:', atualizado.nome, '-', atualizado.preco);
    if (atualizado.nome !== 'Teste Editado' || atualizado.preco !== 200) throw new Error('Falha no update');

    let deuDuplicado = false;
    try {
        await db.criarProduto({ nome: 'Adipotide-5mg', preco: 1, categoria: 'x', descricaoCompleta: 'z' });
    } catch (e) {
        deuDuplicado = e.status === 409;
    }
    if (!deuDuplicado) throw new Error('Falha no 409 (id duplicado)');

    await db.removerProduto(novo.id);
    const final = await db.listarProdutos();
    if (final.length !== 36) throw new Error('Falha no delete: esperado 36');

    let deuNaoEncontrado = false;
    try {
        await db.removerProduto(novo.id);
    } catch (e) {
        deuNaoEncontrado = e.status === 404;
    }
    if (!deuNaoEncontrado) throw new Error('Falha no 404');

    console.log('TODOS OS TESTES OK');
})().catch(err => {
    console.error('FALHOU:', err.message);
    process.exit(1);
});