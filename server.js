/**
 * =====================================================
 * NORDIVIA SERVER - API and static files
 * =====================================================
 *
 * To run:  npm install  and then  npm start
 * The site is available at http://localhost:3000
 *
 * Configuration via environment variables (optional):
 * - PORT          server port (default 3000)
 * - DATABASE_URL  PostgreSQL URL (e.g., Neon/Supabase).
 *                 If absent, uses local JSON file.
 * - PGSSL=true    enables SSL on PostgreSQL
 * - ADMIN_USUARIO admin username (default "admin")
 * - ADMIN_SENHA   admin password (default "nordivia2024")
 * ===================================================== */

const express = require('express');
const crypto = require('crypto');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config();

const criarDb = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_USUARIO = process.env.ADMIN_USUARIO || 'admin';
const ADMIN_SENHA = process.env.ADMIN_SENHA || 'nordivia2024';

const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const tokens = new Set();

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            imgSrc: ["'self'", "data:", "https:"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        }
    }
}));
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static(__dirname));

function autenticado(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!tokens.has(token)) {
        return res.status(401).json({ erro: 'Unauthorized' });
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
                console.error('API error:', e);
            }
            res.status(status).json({ erro: status === 500 ? 'Internal server error' : e.message });
        }
    };
}

    /* =====================================================
       AUTHENTICATION
       ===================================================== */
app.post('/api/login', (req, res) => {
    const { usuario, senha } = req.body || {};
    if (usuario === ADMIN_USUARIO && senha === ADMIN_SENHA) {
        const token = crypto.randomUUID();
        tokens.add(token);
        return res.json({ token });
    }
    res.status(401).json({ erro: 'Invalid username or password' });
});

    /* =====================================================
       PRODUCTS
       ===================================================== */
app.get('/api/produtos', handler(async (req, res) => {
    res.json(await db.listarProdutos());
}));

app.post('/api/produtos', autenticado, handler(async (req, res) => {
    const dados = req.body || {};
    if (!dados.nome || !dados.categoria || !dados.descricaoCompleta) {
        return res.status(400).json({ erro: 'Incomplete data' });
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
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Database: ${db.usarPostgres ? 'PostgreSQL' : 'local JSON file'}`);
    });
}

iniciar().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});