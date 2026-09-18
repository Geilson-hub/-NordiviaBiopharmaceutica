/**
 * =====================================================
 * NORDIVIA BIOPHARMACEUTICA
 * Main Script
 * =====================================================
 *
 * This file contains all the JavaScript functionalities
 * of the Nordivia Biopharmaceuticals landing page.
 *
 * FEATURES:
 * - Mobile menu (hamburger)
 * - Smooth scroll for anchors
 * - Header scroll effect
 * - Hidden admin panel access
 *
 * =====================================================
 */
document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       1. MOBILE MENU (HAMBURGER)
       ===================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Toggle menu
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    /* =====================================================
       2. SMOOTH SCROLL
       ===================================================== */
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =====================================================
        3. HEADER SCROLL EFFECT
       ===================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.2)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0, 119, 182, 0.1)';
        }
    });

    /* =====================================================
        4. HIDDEN ADMIN ACCESS
        Click 5x on the footer logo or press Ctrl+Shift+A
       ===================================================== */
    let cliquesLogo = 0;
    let ultimoCliqueLogo = 0;

    document.addEventListener('click', function (e) {
        const logo = e.target.closest('.footer-logo');
        if (!logo) return;

        const agora = Date.now();
        if (agora - ultimoCliqueLogo > 3000) {
            cliquesLogo = 0;
        }
        ultimoCliqueLogo = agora;
        cliquesLogo++;

        if (cliquesLogo >= 5) {
            cliquesLogo = 0;
            window.location.href = 'admin.html';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
            window.location.href = 'admin.html';
        }
    });

    /* =====================================================
       5. PRODUCTS GRID
       ===================================================== */
    const produtosGrid = document.getElementById('produtosGrid');
    if (produtosGrid) {
        (window.PRODUTOS_PROMISE || Promise.resolve()).then(function () {
            if (Array.isArray(produtos)) {
                renderizarCategoriasSidebar();
                renderizarProdutosGrid(produtosGrid, 'Todas');
            }
        });
    }

});

/* =====================================================
   PRODUCT FUNCTIONS
   ===================================================== */
function obterCategorias() {
    var categorias = ['Todas'];
    produtos.forEach(function (produto) {
        var cat = produto.categoria || 'Other';
        if (!categorias.includes(cat)) categorias.push(cat);
    });
    return categorias;
}

function renderizarCategoriasSidebar() {
    var lista = document.getElementById('categoriasLista');
    if (!lista) return;

    lista.innerHTML = '';
    obterCategorias().forEach(function (categoria, index) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'categoria-btn' + (index === 0 ? ' active' : '');
        btn.textContent = categoria;
        btn.dataset.categoria = categoria;
        btn.addEventListener('click', function () {
            document.querySelectorAll('.categoria-btn').forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            renderizarProdutosGrid(document.getElementById('produtosGrid'), this.dataset.categoria);
        });
        li.appendChild(btn);
        lista.appendChild(li);
    });
}

function renderizarProdutosGrid(container, filtroCategoria) {
    container.innerHTML = '';

    var produtosFiltrados = filtroCategoria === 'Todas'
        ? produtos
        : produtos.filter(function (p) { return (p.categoria || 'Other') === filtroCategoria; });

    if (produtosFiltrados.length === 0) {
        container.innerHTML = '<p class="produtos-vazio">No products found in this category.</p>';
        return;
    }

    produtosFiltrados.forEach(function (produto) {
        var descricao = produto.descricaoCompleta || '';
        var descricaoCurta = descricao.length > 130
            ? descricao.slice(0, 130).trimEnd() + '...'
            : descricao;

        var card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = '<div class="produto-icon"><img src="' + (produto.imagem || './img/Adipotide.png') + '" alt="' + produto.nome + '" onerror="this.src=\'./img/Adipotide.png\'"></div>'
            + '<h3 class="produto-nome">' + produto.nome + '</h3>'
            + '<p class="produto-preco">' + formatarMoeda(produto.preco) + '</p>'
            + '<p class="produto-descricao"><strong>Description:</strong> ' + descricaoCurta + '</p>'
            + '<div class="produto-botoes">'
            + '<a href="detalhes.html?id=' + produto.id + '" class="btn btn-detalhes">Details</a>'
            + '</div>';
        container.appendChild(card);
    });
}

function formatarMoeda(valor) {
    if (!valor || valor === 0) return '';
    return valor.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}
