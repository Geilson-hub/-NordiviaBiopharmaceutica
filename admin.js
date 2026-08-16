/**
 * =====================================================
 * PAINEL DO ADMINISTRADOR - Login e gerenciamento
 * =====================================================
 *
 * Acesso escondido pelo site:
 * - Clique 5x no logo/footer do site
 * - Ou pressione Ctrl+Shift+A
 *
 * Os dados são salvos no servidor (data/produtos.json),
 * então ficam visíveis para todos os visitantes.
 * ===================================================== */

const ADMIN_TOKEN_KEY = 'nordivia_admin_token';

document.addEventListener('DOMContentLoaded', function () {
    const loginView = document.getElementById('adminLogin');
    const painelView = document.getElementById('adminPainel');
    const loginForm = document.getElementById('adminLoginForm');
    const loginErro = document.getElementById('adminLoginErro');
    const btnLogout = document.getElementById('btnAdminLogout');
    const btnNovo = document.getElementById('btnAdminNovoProduto');
    const modal = document.getElementById('adminModal');
    const modalTitulo = document.getElementById('adminModalTitulo');
    const modalFechar = document.getElementById('adminModalFechar');
    const modalCancelar = document.getElementById('adminModalCancelar');
    const produtoForm = document.getElementById('adminProdutoForm');
    const produtosBody = document.getElementById('adminProdutosBody');
    const adminVazio = document.getElementById('adminVazio');

    function getToken() {
        return sessionStorage.getItem(ADMIN_TOKEN_KEY);
    }

    function mostrarLogin() {
        loginView.style.display = 'flex';
        painelView.style.display = 'none';
    }

    function mostrarPainel() {
        loginView.style.display = 'none';
        painelView.style.display = 'block';
        renderizarProdutos();
    }

    function sair() {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        loginForm.reset();
        loginErro.textContent = '';
        mostrarLogin();
    }

    function tratarNaoAutorizado(res) {
        if (res.status === 401) {
            sair();
            loginErro.textContent = 'Sessão expirada. Entre novamente.';
        }
    }

    async function apiRequest(url, options = {}) {
        const headers = Object.assign({}, options.headers || {});
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
        if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';

        const res = await fetch(url, Object.assign({}, options, { headers }));
        return res;
    }

    async function atualizarProdutosLocais() {
        const res = await apiRequest('api/produtos');
        if (!res.ok) throw new Error('Falha ao carregar produtos');
        const lista = await res.json();
        if (Array.isArray(lista)) {
            produtos.length = 0;
            produtos.push(...lista);
        }
    }

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        loginErro.textContent = '';

        const usuario = document.getElementById('adminUsuario').value.trim();
        const senha = document.getElementById('adminSenha').value;

        try {
            const res = await fetch('api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            });

            if (res.ok) {
                const dados = await res.json();
                sessionStorage.setItem(ADMIN_TOKEN_KEY, dados.token);
                mostrarPainel();
            } else {
                loginErro.textContent = 'Usuário ou senha incorretos.';
            }
        } catch (err) {
            loginErro.textContent = 'Erro de conexão com o servidor.';
        }
    });

    btnLogout.addEventListener('click', sair);

    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function renderizarProdutos() {
        const lista = Array.isArray(produtos) ? produtos : [];
        produtosBody.innerHTML = '';
        adminVazio.style.display = lista.length === 0 ? 'block' : 'none';

        lista.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${produto.imagem || './img/hero.png'}" alt="${produto.nome}" class="admin-produto-img" onerror="this.src='./img/hero.png'"></td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td class="admin-produto-preco">${formatarMoeda(produto.preco)}</td>
                <td>
                    <div class="admin-produto-acoes">
                        <button type="button" class="admin-btn-editar" data-id="${produto.id}">Editar</button>
                        <button type="button" class="admin-btn-remover" data-id="${produto.id}">Remover</button>
                    </div>
                </td>
            `;
            produtosBody.appendChild(tr);
        });

        produtosBody.querySelectorAll('.admin-btn-editar').forEach(btn => {
            btn.addEventListener('click', function () {
                const produto = produtos.find(p => p.id === this.getAttribute('data-id'));
                if (produto) abrirModal(produto);
            });
        });

        produtosBody.querySelectorAll('.admin-btn-remover').forEach(btn => {
            btn.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                const produto = produtos.find(p => p.id === id);
                if (!produto) return;
                if (!confirm(`Remover o produto "${produto.nome}"?`)) return;

                try {
                    const res = await apiRequest(`api/produtos/${encodeURIComponent(id)}`, { method: 'DELETE' });
                    if (res.ok) {
                        await atualizarProdutosLocais();
                        renderizarProdutos();
                        mostrarToast('Produto removido com sucesso');
                    } else {
                        tratarNaoAutorizado(res);
                    }
                } catch (err) {
                    mostrarToast('Erro ao remover o produto');
                }
            });
        });
    }

    function abrirModal(produto) {
        modalTitulo.textContent = produto ? 'Editar Produto' : 'Novo Produto';
        document.getElementById('adminProdutoId').value = produto ? produto.id : '';
        document.getElementById('adminProdutoNome').value = produto ? produto.nome : '';
        document.getElementById('adminProdutoPreco').value = produto ? produto.preco : '';
        document.getElementById('adminProdutoCategoria').value = produto ? produto.categoria : '';
        document.getElementById('adminProdutoDosagem').value = produto ? produto.dosagem || '' : '';
        document.getElementById('adminProdutoForma').value = produto ? produto.formaApresentacao || '' : '';
        document.getElementById('adminProdutoArmazenamento').value = produto ? produto.armazenamento || '' : '';
        document.getElementById('adminProdutoValidade').value = produto ? produto.prazoValidade || '' : '';
        document.getElementById('adminProdutoImagem').value = produto ? produto.imagem || '' : '';
        document.getElementById('adminProdutoDescricao').value = produto ? produto.descricaoCompleta || '' : '';
        modal.style.display = 'flex';
    }

    function fecharModal() {
        modal.style.display = 'none';
        produtoForm.reset();
    }

    btnNovo.addEventListener('click', function () {
        abrirModal(null);
    });

    modalFechar.addEventListener('click', fecharModal);
    modalCancelar.addEventListener('click', fecharModal);

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            fecharModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            fecharModal();
        }
    });

    produtoForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const idExistente = document.getElementById('adminProdutoId').value;
        const dados = {
            nome: document.getElementById('adminProdutoNome').value.trim(),
            preco: parseFloat(document.getElementById('adminProdutoPreco').value) || 0,
            categoria: document.getElementById('adminProdutoCategoria').value.trim(),
            dosagem: document.getElementById('adminProdutoDosagem').value.trim(),
            formaApresentacao: document.getElementById('adminProdutoForma').value.trim(),
            armazenamento: document.getElementById('adminProdutoArmazenamento').value.trim(),
            prazoValidade: document.getElementById('adminProdutoValidade').value.trim(),
            imagem: document.getElementById('adminProdutoImagem').value.trim(),
            descricaoCompleta: document.getElementById('adminProdutoDescricao').value.trim()
        };

        if (!dados.nome || !dados.categoria || !dados.descricaoCompleta) return;

        try {
            let res;
            if (idExistente) {
                res = await apiRequest(`api/produtos/${encodeURIComponent(idExistente)}`, {
                    method: 'PUT',
                    body: JSON.stringify(dados)
                });
            } else {
                res = await apiRequest('api/produtos', {
                    method: 'POST',
                    body: JSON.stringify(dados)
                });
            }

            if (res.ok) {
                await atualizarProdutosLocais();
                fecharModal();
                renderizarProdutos();
                mostrarToast(idExistente ? 'Produto atualizado com sucesso' : 'Produto adicionado com sucesso');
            } else if (res.status === 409) {
                alert('Já existe um produto com este id. Tente outro nome.');
            } else {
                tratarNaoAutorizado(res);
            }
        } catch (err) {
            mostrarToast('Erro ao salvar o produto');
        }
    });

    (window.PRODUTOS_PROMISE || Promise.resolve()).then(function () {
        if (getToken()) {
            mostrarPainel();
        } else {
            mostrarLogin();
        }
    });
});