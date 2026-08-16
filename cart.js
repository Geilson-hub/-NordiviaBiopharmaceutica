/**
 * =====================================================
 * CARRINHO - Lógica compartilhada
 * Utilizada nas páginas: index, produtos, detalhes,
 * carrinho e checkout.
 * =====================================================
 */

const CARRINHO_KEY = 'nordivia_carrinho';

const Carrinho = {
    obterItems() {
        try {
            return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    salvarItems(items) {
        localStorage.setItem(CARRINHO_KEY, JSON.stringify(items));
        this.atualizarBadge();
    },

    adicionar(id, quantidade = 1) {
        const items = this.obterItems();
        const item = items.find(i => i.id === id);
        if (item) {
            item.quantidade += quantidade;
        } else {
            items.push({ id, quantidade, selecionado: true });
        }
        this.salvarItems(items);
    },

    remover(id) {
        this.salvarItems(this.obterItems().filter(i => i.id !== id));
    },

    removerVarios(ids) {
        this.salvarItems(this.obterItems().filter(i => !ids.includes(i.id)));
    },

    atualizarQuantidade(id, quantidade) {
        const items = this.obterItems();
        const item = items.find(i => i.id === id);
        if (item) {
            item.quantidade = Math.max(1, parseInt(quantidade, 10) || 1);
            this.salvarItems(items);
        }
    },

    setSelecionado(id, selecionado) {
        const items = this.obterItems();
        const item = items.find(i => i.id === id);
        if (item) {
            item.selecionado = selecionado;
            this.salvarItems(items);
        }
    },

    obterSelecionados() {
        return this.obterItems().filter(i => i.selecionado !== false);
    },

    obterQuantidadeTotal() {
        return this.obterItems().reduce((acc, i) => acc + i.quantidade, 0);
    },

    atualizarBadge() {
        const total = this.obterQuantidadeTotal();
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.textContent = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    Carrinho.atualizarBadge();

    // Botões "Adicionar ao Carrinho" (usam data-id) - delegação de eventos
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-adicionar-carrinho');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        if (!id) return;
        Carrinho.adicionar(id);

        const original = btn.textContent;
        btn.textContent = '✓ Adicionado';
        setTimeout(() => { btn.textContent = original; }, 1500);
        mostrarToast('Produto adicionado ao carrinho', 'carrinho.html');
    });

    // Renderiza o grid de produtos na página de produtos
    const produtosGrid = document.getElementById('produtosGrid');
    if (produtosGrid) {
        (window.PRODUTOS_PROMISE || Promise.resolve()).then(() => {
            if (Array.isArray(produtos)) {
                renderizarProdutosGrid(produtosGrid);
            }
        });
    }
});

function renderizarProdutosGrid(container) {
    container.innerHTML = '';

    produtos.forEach(produto => {
        const descricao = produto.descricaoCompleta || '';
        const descricaoCurta = descricao.length > 130
            ? descricao.slice(0, 130).trimEnd() + '...'
            : descricao;

        const card = document.createElement('div');
        card.className = 'produto-card';
        card.innerHTML = `
            <div class="produto-icon"><img src="${produto.imagem || './img/hero.png'}" alt="${produto.nome}" onerror="this.src='./img/hero.png'"></div>
            <h3 class="produto-nome">${produto.nome}</h3>
            <p class="produto-preco">${formatarMoeda(produto.preco)}</p>
            <p class="produto-descricao"><strong>Descrição:</strong> ${descricaoCurta}</p>
            <div class="produto-botoes">
                <a href="detalhes.html?id=${produto.id}" class="btn btn-detalhes">Detalhes</a>
                <button type="button" class="btn btn-carrinho btn-adicionar-carrinho" data-id="${produto.id}">Adicionar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function mostrarToast(mensagem, link) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    const linkHtml = link
        ? `<a href="${link}" class="toast-link">Ver carrinho</a>`
        : '';
    toast.innerHTML = `<span>${mensagem}</span>${linkHtml}`;
    toast.classList.add('show');

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
