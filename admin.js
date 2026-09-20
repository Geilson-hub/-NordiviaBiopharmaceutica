/**
 * =====================================================
 * ADMINISTRATOR PANEL - Login and management
 * =====================================================
 *
 * Hidden access from the site:
 * - Click 5x on the logo/footer
 * - Or press Ctrl+Shift+A
 *
 * Data is saved on the server (data/produtos.json),
 * so it's visible to all visitors.
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

    // Employee elements
    const btnNovoFuncionario = document.getElementById('btnAdminNovoFuncionario');
    const modalFuncionario = document.getElementById('adminModalFuncionario');
    const modalFuncionarioTitulo = document.getElementById('adminModalFuncionarioTitulo');
    const modalFuncionarioFechar = document.getElementById('adminModalFuncionarioFechar');
    const modalFuncionarioCancelar = document.getElementById('adminModalFuncionarioCancelar');
    const funcionarioForm = document.getElementById('adminFuncionarioForm');
    const funcionariosBody = document.getElementById('adminFuncionariosBody');
    const adminFuncionariosVazio = document.getElementById('adminFuncionariosVazio');

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
        renderizarFuncionarios();
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
            loginErro.textContent = 'Session expired. Please login again.';
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
        if (!res.ok)         throw new Error('Failed to load products');
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
                loginErro.textContent = 'Invalid username or password.';
            }
        } catch (err) {
            loginErro.textContent = 'Server connection error.';
        }
    });

    btnLogout.addEventListener('click', sair);

    function formatarMoeda(valor) {
        if (!valor || valor === 0) return '';
        return Number(valor || 0).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    function renderizarProdutos() {
        const lista = Array.isArray(produtos) ? produtos : [];
        produtosBody.innerHTML = '';
        adminVazio.style.display = lista.length === 0 ? 'block' : 'none';

        lista.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${produto.imagem || './img/Adipotide.png'}" alt="${produto.nome}" class="admin-produto-img" onerror="this.src='./img/Adipotide.png'"></td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td class="admin-produto-preco">${formatarMoeda(produto.preco)}</td>
                <td>
                    <div class="admin-produto-acoes">
                        <button type="button" class="admin-btn-editar" data-id="${produto.id}">Edit</button>
                        <button type="button" class="admin-btn-remover" data-id="${produto.id}">Remove</button>
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
                if (!confirm(`Remove product "${produto.nome}"?`)) return;

                try {
                    const res = await apiRequest(`api/produtos/${encodeURIComponent(id)}`, { method: 'DELETE' });
                    if (res.ok) {
                        await atualizarProdutosLocais();
                        renderizarProdutos();
                        mostrarToast('Product removed successfully');
                    } else {
                        tratarNaoAutorizado(res);
                    }
                } catch (err) {
                    mostrarToast('Error removing product');
                }
            });
        });
    }

    function abrirModal(produto) {
        modalTitulo.textContent = produto ? 'Edit Product' : 'New Product';
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
                mostrarToast(idExistente ? 'Product updated successfully' : 'Product added successfully');
            } else if (res.status === 409) {
                alert('A product with this ID already exists. Try another name.');
            } else {
                tratarNaoAutorizado(res);
            }
        } catch (err) {
            mostrarToast('Error saving product');
        }
    });

    (window.PRODUTOS_PROMISE || Promise.resolve()).then(function () {
        if (getToken()) {
            mostrarPainel();
        } else {
            mostrarLogin();
        }
    });

    /* =====================================================
       EMPLOYEE MANAGEMENT
       ===================================================== */
    let funcionarios = [];

    async function carregarFuncionarios() {
        try {
            const res = await apiRequest('api/funcionarios');
            if (res.ok) {
                const lista = await res.json();
                if (Array.isArray(lista)) {
                    funcionarios = lista;
                }
            }
        } catch (e) {
            console.error('Could not load employees:', e);
        }
    }

    function traduzirDia(dia) {
        const traducoes = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' };
        return traducoes[dia] || dia;
    }

    function formatarDias(dias) {
        if (!dias) return '';
        return dias.split(',').map(d => d.trim()).map(d => traduzirDia(d)).join(', ');
    }

    function renderizarFuncionarios() {
        const lista = Array.isArray(funcionarios) ? funcionarios : [];
        funcionariosBody.innerHTML = '';
        adminFuncionariosVazio.style.display = lista.length === 0 ? 'block' : 'none';

        lista.forEach(func => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.funcao}</td>
                <td>${formatarDias(func.diasSemana)}</td>
                <td>${func.horaEntrada} - ${func.horaSaida}</td>
                <td>
                    <div class="admin-produto-acoes">
                        <button type="button" class="admin-btn-editar" data-id="${func.id}">Edit</button>
                        <button type="button" class="admin-btn-remover" data-id="${func.id}">Remove</button>
                    </div>
                </td>
            `;
            funcionariosBody.appendChild(tr);
        });

        funcionariosBody.querySelectorAll('.admin-btn-editar').forEach(btn => {
            btn.addEventListener('click', function () {
                const func = funcionarios.find(f => f.id === this.getAttribute('data-id'));
                if (func) abrirModalFuncionario(func);
            });
        });

        funcionariosBody.querySelectorAll('.admin-btn-remover').forEach(btn => {
            btn.addEventListener('click', async function () {
                const id = this.getAttribute('data-id');
                const func = funcionarios.find(f => f.id === id);
                if (!func) return;
                if (!confirm(`Remove employee "${func.nome}"?`)) return;

                try {
                    const res = await apiRequest(`api/funcionarios/${encodeURIComponent(id)}`, { method: 'DELETE' });
                    if (res.ok) {
                        await carregarFuncionarios();
                        renderizarFuncionarios();
                        mostrarToast('Employee removed successfully');
                    } else {
                        tratarNaoAutorizado(res);
                    }
                } catch (err) {
                    mostrarToast('Error removing employee');
                }
            });
        });
    }

    function abrirModalFuncionario(funcionario) {
        modalFuncionarioTitulo.textContent = funcionario ? 'Edit Employee' : 'New Employee';
        document.getElementById('adminFuncionarioId').value = funcionario ? funcionario.id : '';
        document.getElementById('adminFuncionarioNome').value = funcionario ? funcionario.nome : '';
        document.getElementById('adminFuncionarioFuncao').value = funcionario ? funcionario.funcao : '';
        document.getElementById('adminFuncionarioEntrada').value = funcionario ? funcionario.horaEntrada || '' : '';
        document.getElementById('adminFuncionarioSaida').value = funcionario ? funcionario.horaSaida || '' : '';
        document.getElementById('adminFuncionarioObservacoes').value = funcionario ? funcionario.observacoes || '' : '';

        // Set checkboxes
        const dias = funcionario ? (funcionario.diasSemana || '').split(',').map(d => d.trim()) : [];
        document.querySelectorAll('input[name="diasSemana"]').forEach(cb => {
            cb.checked = dias.includes(cb.value);
        });

        modalFuncionario.style.display = 'flex';
    }

    function fecharModalFuncionario() {
        modalFuncionario.style.display = 'none';
        funcionarioForm.reset();
    }

    btnNovoFuncionario.addEventListener('click', function () {
        abrirModalFuncionario(null);
    });

    modalFuncionarioFechar.addEventListener('click', fecharModalFuncionario);
    modalFuncionarioCancelar.addEventListener('click', fecharModalFuncionario);

    modalFuncionario.addEventListener('click', function (e) {
        if (e.target === modalFuncionario) {
            fecharModalFuncionario();
        }
    });

    funcionarioForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const idExistente = document.getElementById('adminFuncionarioId').value;
        const diasSelecionados = Array.from(document.querySelectorAll('input[name="diasSemana"]:checked'))
            .map(cb => cb.value).join(',');

        const dados = {
            nome: document.getElementById('adminFuncionarioNome').value.trim(),
            funcao: document.getElementById('adminFuncionarioFuncao').value.trim(),
            diasSemana: diasSelecionados,
            horaEntrada: document.getElementById('adminFuncionarioEntrada').value,
            horaSaida: document.getElementById('adminFuncionarioSaida').value,
            observacoes: document.getElementById('adminFuncionarioObservacoes').value.trim()
        };

        if (!dados.nome || !dados.funcao || !dados.diasSemana || !dados.horaEntrada || !dados.horaSaida) {
            mostrarToast('Please fill all required fields');
            return;
        }

        try {
            let res;
            if (idExistente) {
                res = await apiRequest(`api/funcionarios/${encodeURIComponent(idExistente)}`, {
                    method: 'PUT',
                    body: JSON.stringify(dados)
                });
            } else {
                res = await apiRequest('api/funcionarios', {
                    method: 'POST',
                    body: JSON.stringify(dados)
                });
            }

            if (res.ok) {
                await carregarFuncionarios();
                fecharModalFuncionario();
                renderizarFuncionarios();
                mostrarToast(idExistente ? 'Employee updated successfully' : 'Employee added successfully');
            } else if (res.status === 409) {
                alert('An employee with this name already exists.');
            } else {
                tratarNaoAutorizado(res);
            }
        } catch (err) {
            mostrarToast('Error saving employee');
        }
    });

    carregarFuncionarios();
});