/**
 * =====================================================
 * CHECKOUT - Payment (multiple cart items)
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {
    (window.PRODUTOS_PROMISE || Promise.resolve()).then(function () {

    // ========================================
    // PRODUCT DATA
    // ========================================
    const precos = {};
    if (typeof produtos !== 'undefined') {
        produtos.forEach(p => {
            precos[p.id] = { valor: p.preco, nome: p.nome, imagem: p.imagem, categoria: p.categoria };
        });
    }

    // ========================================
    // CAPTURE ORDER ITEMS
    // ========================================
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    let itens = [];
    let origemCarrinho = false;

    if (produtoId && precos[produtoId]) {
        // Quick purchase of a single product
        const p = precos[produtoId];
        itens.push({ id: produtoId, quantidade: 1, ...p });
    } else {
        // Items selected in cart
        origemCarrinho = true;
        Carrinho.obterSelecionados().forEach(item => {
            const p = precos[item.id];
            if (p) {
                itens.push({ id: item.id, quantidade: item.quantidade, ...p });
            }
        });
    }

    const valorTotal = itens.reduce((acc, i) => acc + (i.valor * i.quantidade), 0);

    if (itens.length > 0) {
        renderizarResumo(itens, valorTotal);
        gerarOpcoesParcelamento(valorTotal);
        inicializarPayPal(valorTotal);
    } else {
        document.getElementById('resumoItens').innerHTML =
            '<p class="resumo-vazio">No products selected for payment.<br><a href="carrinho.html" class="btn btn-detalhes" style="margin-top:15px;">View my cart</a></p>';
    }

    // ========================================
    // RENDER SUMMARY
    // ========================================
    function renderizarResumo(itens, total) {
        const container = document.getElementById('resumoItens');
        container.innerHTML = '';

        itens.forEach(item => {
            const row = document.createElement('div');
            row.className = 'resumo-item';
            row.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="resumo-info">
                    <h3>${item.nome}</h3>
                    <p>${item.categoria}</p>
                    <p>Qtd: ${item.quantidade}</p>
                </div>
                <span class="resumo-item-preco">${formatarMoeda(item.valor * item.quantidade)}</span>
            `;
            container.appendChild(row);
        });

        document.getElementById('resumo-valor').textContent = formatarMoeda(total);
        document.getElementById('resumo-total').textContent = formatarMoeda(total);
        document.getElementById('resumo-parcelas').textContent = '';
    }

    // ========================================
    // INITIALIZE PAYPAL
    // ========================================
    function inicializarPayPal(total) {
        const paypalContainer = document.getElementById('paypal-button-container');

        if (typeof paypal === 'undefined') {
            paypalContainer.innerHTML = '<p class="paypal-erro">PayPal not configured. Configure your Client ID.</p>';
            return;
        }

        paypalContainer.innerHTML = '';

        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                height: 50
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: `Nordivia Order (${itens.length} ${itens.length === 1 ? 'item' : 'items'})`,
                        amount: {
                            currency_code: 'USD',
                            value: total.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: total.toFixed(2)
                                }
                            }
                        },
                        items: itens.map(i => ({
                            name: i.nome,
                            unit_amount: {
                                currency_code: 'USD',
                                value: i.valor.toFixed(2)
                            },
                            quantity: String(i.quantidade)
                        }))
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (detalhes) {
                    mostrarSucesso(detalhes);
                });
            },
            onError: function (err) {
                console.error('PayPal error:', err);
                alert('Error processing payment. Please try again.');
            },
            onCancel: function (data) {
                alert('Payment cancelled.');
            }
        }).render('#paypal-button-container');
    }

    // ========================================
    // SHOW SUCCESS
    // ========================================
    function mostrarSucesso(detalhes) {
        // Remove paid items from cart
        if (origemCarrinho) {
            Carrinho.removerVarios(itens.map(i => i.id));
        }

        const container = document.querySelector('.checkout-form');
        container.innerHTML = `
                <div class="pagamento-sucesso">
                <div class="sucesso-icon">✅</div>
                <h2>Payment Approved!</h2>
                <p>Thank you for your purchase, <strong>${detalhes.payer.name.given_name}</strong>!</p>
                <p>Your order <strong>#${detalhes.id}</strong> has been confirmed.</p>
                <div class="sucesso-detalhes">
                    ${itens.map(i => `<p><strong>${i.nome}</strong> (Qtd: ${i.quantidade}) - ${formatarMoeda(i.valor * i.quantidade)}</p>`).join('')}
                    <p><strong>Total:</strong> ${formatarMoeda(valorTotal)}</p>
                    <p><strong>Status:</strong> ${detalhes.status}</p>
                </div>
                <p class="sucesso-email">A confirmation email has been sent to: <strong>${detalhes.payer.email_address}</strong></p>
                <a href="produtos.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }

    // ========================================
    // INPUT MASKS
    // ========================================
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    cepInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // ========================================
    // PAYMENT METHOD SELECTION
    // ========================================
    const paymentOptions = document.querySelectorAll('.payment-option');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const parcelamentoSection = document.getElementById('parcelamentoSection');
    const paypalContainer = document.getElementById('paypal-button-container');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            const method = this.querySelector('input').value;
            if (method === 'paypal') {
                btnWhatsApp.style.display = 'none';
                parcelamentoSection.classList.remove('hidden');
                paypalContainer.style.display = 'block';
            } else {
                btnWhatsApp.style.display = 'inline-flex';
                parcelamentoSection.classList.add('hidden');
                paypalContainer.style.display = 'none';
            }
        });
    });

    // ========================================
    // WHATSAPP BUTTON
    // ========================================
    btnWhatsApp.addEventListener('click', function () {
        if (!validarFormulario()) return;

        const nome = document.getElementById('nome').value;
        const listaItens = itens
            .map(i => `- *${i.nome}* (Qtd: ${i.quantidade}) - ${formatarMoeda(i.valor * i.quantidade)}`)
            .join('\n');

        const mensagem = encodeURIComponent(
            `Hello! I would like to complete my purchase.\n\n` +
            `*Order Items:*\n${listaItens}\n\n` +
            `*Total:* ${formatarMoeda(valorTotal)}\n\n` +
            `*Customer Details:*\n` +
            `Name: ${nome}\n` +
            `Tax ID: ${document.getElementById('cpf').value}\n` +
            `Phone: ${document.getElementById('telefone').value}\n` +
            `Email: ${document.getElementById('email').value}\n\n` +
            `*Address:*\n` +
            `${document.getElementById('endereco').value}\n` +
            `${document.getElementById('bairro').value} - ${document.getElementById('cidade').value}/${document.getElementById('estado').value}\n` +
            `ZIP: ${document.getElementById('cep').value}`
        );

        window.open(`https://wa.me/5511956970564?text=${mensagem}`, '_blank');
    });

    // ========================================
    // GENERATE INSTALLMENT OPTIONS
    // ========================================
    function gerarOpcoesParcelamento(valor) {
        const container = document.getElementById('parcelamentoOptions');
        container.innerHTML = '';

        for (let i = 1; i <= 6; i++) {
            const valorParcela = valor / i;
            const texto = i === 1
                ? `1x of ${formatarMoeda(valorParcela)} cash`
                : `${i}x of ${formatarMoeda(valorParcela)} interest-free`;

            const label = document.createElement('label');
            label.className = `parcelamento-option ${i === 1 ? 'active' : ''}`;
            label.innerHTML = `
                <input type="radio" name="parcelamento" value="${i}" ${i === 1 ? 'checked' : ''}>
                <div class="parcelamento-card">
                    <span class="parcelas-numero">${i}x</span>
                    <span class="parcelas-info">${texto}</span>
                </div>
            `;
            container.appendChild(label);

            label.addEventListener('click', function () {
                document.querySelectorAll('.parcelamento-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                atualizarTotal(i, valor);
            });
        }
    }

    // ========================================
    // UPDATE TOTAL BASED ON INSTALLMENTS
    // ========================================
    function atualizarTotal(parcelas, valor) {
        const valorParcela = valor / parcelas;
        const parcelasElement = document.getElementById('resumo-parcelas');

        if (parcelas === 1) {
            parcelasElement.textContent = 'Cash payment';
        } else {
            parcelasElement.textContent = `${parcelas}x of ${formatarMoeda(valorParcela)} interest-free`;
        }
    }

    // ========================================
    // HELPER FUNCTIONS
    // ========================================
    function formatarMoeda(valor) {
        if (!valor || valor === 0) return '';
        return valor.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    function validarFormulario() {
        const campos = ['nome', 'email', 'telefone', 'cpf', 'endereco', 'bairro', 'cidade', 'estado', 'cep'];

        for (const campo of campos) {
            const input = document.getElementById(campo);
            if (!input.value.trim()) {
                input.focus();
                alert(`Please fill in the field: ${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
                return false;
            }
        }

        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            alert('Invalid Tax ID');
            document.getElementById('cpf').focus();
            return false;
        }

        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length !== 8) {
            alert('Invalid ZIP code');
            document.getElementById('cep').focus();
            return false;
        }

        return true;
    }

    });
});
