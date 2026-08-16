/**
 * =====================================================
 * PÁGINA DO CARRINHO - Lista, seleção e quantidades
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    (window.PRODUTOS_PROMISE || Promise.resolve()).then(function () {
        renderizarCarrinho();

        document.getElementById('btnIrPagamento').addEventListener('click', irParaPagamento);

        document.getElementById('selecionarTodos').addEventListener('change', function () {
            const items = Carrinho.obterItems();
            items.forEach(item => {
                item.selecionado = this.checked;
            });
            Carrinho.salvarItems(items);
            renderizarCarrinho();
        });
    });
});

function renderizarCarrinho() {
    const conteudo = document.getElementById('carrinhoConteudo');
    const vazio = document.getElementById('carrinhoVazio');
    const itemsCarrinho = Carrinho.obterItems();

    if (itemsCarrinho.length === 0) {
        conteudo.style.display = 'none';
        vazio.style.display = 'block';
        return;
    }

    conteudo.style.display = 'grid';
    vazio.style.display = 'none';

    const itemsDetalhados = itemsCarrinho.map(item => {
        const produto = produtos.find(p => p.id === item.id);
        return {
            ...item,
            nome: produto ? produto.nome : item.id,
            imagem: produto ? produto.imagem : '',
            categoria: produto ? produto.categoria : '',
            valor: produto ? produto.preco : 0
        };
    });

    const container = document.getElementById('carrinhoItems');
    container.innerHTML = '';

    itemsDetalhados.forEach(item => {
        const row = document.createElement('div');
        row.className = 'carrinho-item' + (item.selecionado !== false ? '' : ' nao-selecionado');
        row.dataset.id = item.id;

        row.innerHTML = `
            <input type="checkbox" class="carrinho-item-check" ${item.selecionado !== false ? 'checked' : ''} aria-label="Selecionar ${item.nome}">
            <img src="${item.imagem}" alt="${item.nome}" class="carrinho-item-img">
            <div class="carrinho-item-info">
                <h3>${item.nome}</h3>
                <p>${item.categoria}</p>
            </div>
            <div class="quantidade-controle">
                <button type="button" class="qtd-btn menos" aria-label="Diminuir">−</button>
                <span class="qtd-valor">${item.quantidade}</span>
                <button type="button" class="qtd-btn mais" aria-label="Aumentar">+</button>
            </div>
            <span class="carrinho-item-preco">${formatarMoeda(item.valor * item.quantidade)}</span>
            <button type="button" class="carrinho-remover" aria-label="Remover ${item.nome}">✕</button>
        `;

        container.appendChild(row);

        row.querySelector('.carrinho-item-check').addEventListener('change', function () {
            Carrinho.setSelecionado(item.id, this.checked);
            renderizarCarrinho();
        });

        row.querySelector('.qtd-btn.menos').addEventListener('click', function () {
            Carrinho.atualizarQuantidade(item.id, item.quantidade - 1);
            renderizarCarrinho();
        });

        row.querySelector('.qtd-btn.mais').addEventListener('click', function () {
            Carrinho.atualizarQuantidade(item.id, item.quantidade + 1);
            renderizarCarrinho();
        });

        row.querySelector('.carrinho-remover').addEventListener('click', function () {
            Carrinho.remover(item.id);
            renderizarCarrinho();
        });
    });

    const todos = document.getElementById('selecionarTodos');
    todos.checked = itemsDetalhados.every(i => i.selecionado !== false);

    atualizarResumo(itemsDetalhados);
    Carrinho.atualizarBadge();
}

function atualizarResumo(items) {
    const selecionados = items.filter(i => i.selecionado !== false);
    const total = selecionados.reduce((acc, i) => acc + (i.valor * i.quantidade), 0);

    document.getElementById('carrinhoSelecionadosInfo').textContent =
        `${selecionados.length} ${selecionados.length === 1 ? 'item selecionado' : 'itens selecionados'}`;
    document.getElementById('carrinhoTotal').textContent = formatarMoeda(total);
    document.getElementById('carrinhoTotalFinal').textContent = formatarMoeda(total);

    const btn = document.getElementById('btnIrPagamento');
    btn.disabled = selecionados.length === 0;
}

function irParaPagamento() {
    const selecionados = Carrinho.obterSelecionados();
    if (selecionados.length === 0) {
        alert('Selecione ao menos um produto para pagamento.');
        return;
    }
    window.location.href = 'checkout.html';
}
