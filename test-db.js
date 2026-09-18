/**
 * Data layer test using in-memory PostgreSQL (pg-mem).
 * Run with: npm run test:db
 */

const { newDb } = require('pg-mem');
const criarDb = require('./db');

(async function () {
    const memoria = newDb();
    const { Pool } = memoria.adapters.createPg();
    const db = await criarDb({ pool: new Pool() });

    if (!db.usarPostgres) throw new Error('Should be using PostgreSQL');

    const lista = await db.listarProdutos();
    console.log('Seed:', lista.length, 'products');
    if (lista.length !== 36) throw new Error('Seed failed: expected 36');

    const novo = await db.criarProduto({
        nome: 'Test Postgres',
        preco: 123.45,
        categoria: 'Test',
        dosagem: '1mg',
        formaApresentacao: 'Powder',
        armazenamento: 'Refrigerated',
        prazoValidade: '24 months',
        imagem: './img/hero.png',
        descricaoCompleta: 'Product created via PostgreSQL.'
    });
    console.log('Created:', novo.id, '-', novo.nome);
    if (novo.id !== 'teste-postgres') throw new Error('Generated ID failed');

    const atualizado = await db.atualizarProduto(novo.id, {
        nome: 'Test Edited',
        preco: 200,
        categoria: 'Test',
        descricaoCompleta: 'Edited.'
    });
    console.log('Updated:', atualizado.nome, '-', atualizado.preco);
    if (atualizado.nome !== 'Test Edited' || atualizado.preco !== 200) throw new Error('Update failed');

    let deuDuplicado = false;
    try {
        await db.criarProduto({ nome: 'Adipotide-5mg', preco: 1, categoria: 'x', descricaoCompleta: 'z' });
    } catch (e) {
        deuDuplicado = e.status === 409;
    }
    if (!deuDuplicado) throw new Error('Duplicate ID (409) test failed');

    await db.removerProduto(novo.id);
    const final = await db.listarProdutos();
    if (final.length !== 36) throw new Error('Delete failed: expected 36');

    let deuNaoEncontrado = false;
    try {
        await db.removerProduto(novo.id);
    } catch (e) {
        deuNaoEncontrado = e.status === 404;
    }
    if (!deuNaoEncontrado) throw new Error('Not found (404) test failed');

    console.log('ALL TESTS PASSED');
})().catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
});