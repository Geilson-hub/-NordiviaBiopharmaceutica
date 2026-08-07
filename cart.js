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

    // Botões "Adicionar ao Carrinho" (usam data-id)
    document.querySelectorAll('.btn-adicionar-carrinho').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            if (!id) return;
            Carrinho.adicionar(id);

            const original = this.textContent;
            this.textContent = '✓ Adicionado';
            setTimeout(() => { this.textContent = original; }, 1500);
            mostrarToast('Produto adicionado ao carrinho', 'carrinho.html');
        });
    });

    // Preços nos cards da página de produtos
    if (document.querySelector('.produto-card') && typeof produtos !== 'undefined') {
        document.querySelectorAll('.produto-card').forEach(card => {
            const link = card.querySelector('a[href^="detalhes.html"]');
            if (!link) return;
            const id = new URL(link.getAttribute('href'), window.location.href).searchParams.get('id');
            const produto = produtos.find(p => p.id === id);
            if (!produto) return;

            const precoEl = document.createElement('p');
            precoEl.className = 'produto-preco';
            precoEl.textContent = formatarMoeda(produto.preco);
            const nomeEl = card.querySelector('.produto-nome');
            nomeEl.parentNode.insertBefore(precoEl, nomeEl.nextSibling);
        });
    }
});

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
