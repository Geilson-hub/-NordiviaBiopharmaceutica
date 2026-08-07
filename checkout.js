/**
 * =====================================================
 * CHECKOUT - Sistema de Pagamento PayPal
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // CONFIGURAÇÃO PAYPAL (MODO TESTE)
    // ========================================
    // IMPORTANTE: Substitua pelo seu Client ID do PayPal
    // Para teste, use o Client ID do PayPal Sandbox
    // Para produção, use o Client ID do PayPal Live
    const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID'; // Substitua pelo seu Client ID

    // ========================================
    // DADOS DOS PRODUTOS (PREÇOS DE TESTE)
    // ========================================
    const precos = {
        'adipotide-5mg': { valor: 450.00, nome: 'Adipotide-5mg' },
        'aod-9604-5mg': { valor: 380.00, nome: 'AOD-9604-5mg' },
        'bpc-157-hero': { valor: 420.00, nome: 'BPC-157 Hero' },
        'cagrilintide-hero': { valor: 650.00, nome: 'Cagrilintide Hero' },
        'cartalax-hero': { valor: 380.00, nome: 'Cartalax Hero' },
        'cerebrolysin-hero': { valor: 520.00, nome: 'Cerebrolysin Hero' },
        'cido-hialur-nico-hero': { valor: 350.00, nome: 'Ácido Hialurônico Hero' },
        'cjc-1295-hero': { valor: 420.00, nome: 'CJC-1295 Hero' },
        'cjc-1295-with-dac-5mg': { valor: 420.00, nome: 'CJC-1295 with DAC-5mg' },
        'cjc-1295-without-dac-10mg': { valor: 480.00, nome: 'CJC-1295 without DAC-10mg' },
        'dsip-hero': { valor: 320.00, nome: 'DSIP Hero' },
        'epithalon-hero': { valor: 580.00, nome: 'Epithalon Hero' },
        'follistatin-1mg': { valor: 520.00, nome: 'Follistatin-1mg' },
        'follistatin-hero': { valor: 620.00, nome: 'Follistatin Hero' },
        'ghk-cu-100mg': { valor: 350.00, nome: 'GHK-Cu-100mg' },
        'ghk-cu-skin-care-hero': { valor: 280.00, nome: 'GHK-Cu Skin Care Hero' },
        'glow-70mg': { valor: 290.00, nome: 'Glow-70mg' },
        'glow-hero': { valor: 350.00, nome: 'Glow Hero' },
        'hcg-10000ui': { valor: 380.00, nome: 'HCG-10000UI' },
        'hcg-hero': { valor: 320.00, nome: 'HCG Hero' },
        'hgh-fragment-176-191-5mg': { valor: 420.00, nome: 'HGH Fragment 176-191-5mg' },
        'hgh-fragment-176-191-hero': { valor: 450.00, nome: 'HGH Fragment 176-191 Hero' },
        'hgh-somatropina-hero': { valor: 850.00, nome: 'HGH Somatropina Hero' },
        'igf-1-lr3-1mg': { valor: 550.00, nome: 'IGF-1 LR3-1mg' },
        'igf-1-lr3-hero': { valor: 620.00, nome: 'IGF-1 LR3 Hero' },
        'igf-des-hero': { valor: 480.00, nome: 'IGF-DES Hero' },
        'ipamorelin-10mg': { valor: 480.00, nome: 'Ipamorelin-10mg' },
        'ipamorelin-hero': { valor: 520.00, nome: 'Ipamorelin Hero' },
        'klow-80mg': { valor: 320.00, nome: 'Klow-80mg' },
        'klow-hero': { valor: 380.00, nome: 'Klow Hero' },
        'kpv-hero': { valor: 350.00, nome: 'KPV Hero' },
        'lemon-bottle-10mg': { valor: 280.00, nome: 'Lemon Bottle-10mg' },
        'lemon-bottle-hero': { valor: 320.00, nome: 'Lemon Bottle Hero' },
        'mots-c-40mg': { valor: 450.00, nome: 'MOTS-c-40mg' },
        'mots-c-hero': { valor: 480.00, nome: 'MOTS-c Hero' },
        'nadplus-hero': { valor: 580.00, nome: 'NAD+ Hero' },
        'pinealon-20mg': { valor: 390.00, nome: 'Pinealon-20mg' },
        'pinealon-hero': { valor: 420.00, nome: 'Pinealon Hero' },
        'pt-141-10mg': { valor: 350.00, nome: 'PT-141-10mg' },
        'pt-141-hero': { valor: 420.00, nome: 'PT-141 Hero' },
        'ptd-dbm-hero': { valor: 480.00, nome: 'PTD-DBM Hero' },
        'retatrutida-hero': { valor: 780.00, nome: 'Retatrutide Hero' },
        'retatrutide-60mg': { valor: 890.00, nome: 'Retatrutide-60mg' },
        'selank-hero': { valor: 320.00, nome: 'Selank Hero' },
        'semax-hero': { valor: 380.00, nome: 'Semax Hero' },
        'slu-pp-332-5mg': { valor: 420.00, nome: 'SLU-PP-332-5mg' },
        'ss-31-10mg': { valor: 380.00, nome: 'SS-31-10mg' },
        'tesamorelin-10mg': { valor: 450.00, nome: 'Tesamorelin-10mg' },
        'thymosin-alpha1-10mg': { valor: 520.00, nome: 'Thymosin Alpha-1-10mg' },
        'tirzepatide-15mg': { valor: 780.00, nome: 'Tirzepatide-15mg' },
        'tirzepatide-60mg': { valor: 2250.00, nome: 'Tirzepatide-60mg' }
    };

    // ========================================
    // CAPTURAR DADOS DO PRODUTO
    // ========================================
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
    let produtoInfo = null;
    let valorProduto = 0;
    let parcelasSelecionadas = 1;

    if (produtoId && precos[produtoId]) {
        produtoInfo = precos[produtoId];
        valorProduto = produtoInfo.valor;

        // Atualizar resumo
        document.getElementById('resumo-nome').textContent = produtoInfo.nome;
        document.getElementById('resumo-valor').textContent = formatarMoeda(valorProduto);
        document.getElementById('resumo-total').textContent = formatarMoeda(valorProduto);

        // Gerar opções de parcelamento
        gerarOpcoesParcelamento(valorProduto);

        // Buscar imagem do produto
        if (typeof produtos !== 'undefined') {
            const produtoCompleto = produtos.find(p => p.id === produtoId);
            if (produtoCompleto) {
                document.getElementById('resumo-imagem').src = produtoCompleto.imagem;
                document.getElementById('resumo-imagem').alt = produtoCompleto.nome;
                document.getElementById('resumo-categoria').textContent = produtoCompleto.categoria;
            }
        }

        // Inicializar PayPal
        inicializarPayPal();
    }

    // ========================================
    // INICIALIZAR PAYPAL
    // ========================================
    function inicializarPayPal() {
        const paypalContainer = document.getElementById('paypal-button-container');
        
        if (typeof paypal === 'undefined') {
            paypalContainer.innerHTML = '<p class="paypal-erro">PayPal não configurado. Configure seu Client ID.</p>';
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
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: produtoInfo.nome,
                        amount: {
                            currency_code: 'BRL',
                            value: (valorProduto / parcelasSelecionadas).toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'BRL',
                                    value: (valorProduto / parcelasSelecionadas).toFixed(2)
                                }
                            }
                        },
                        items: [{
                            name: produtoInfo.nome,
                            description: produtoInfo.nome,
                            unit_amount: {
                                currency_code: 'BRL',
                                value: (valorProduto / parcelasSelecionadas).toFixed(2)
                            },
                            quantity: '1'
                        }]
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(detalhes) {
                    mostrarSucesso(detalhes);
                });
            },
            onError: function(err) {
                console.error('Erro no PayPal:', err);
                alert('Erro ao processar pagamento. Tente novamente.');
            },
            onCancel: function(data) {
                alert('Pagamento cancelado.');
            }
        }).render('#paypal-button-container');
    }

    // ========================================
    // MOSTRAR SUCESSO
    // ========================================
    function mostrarSucesso(detalhes) {
        const container = document.querySelector('.checkout-form');
        container.innerHTML = `
            <div class="pagamento-sucesso">
                <div class="sucesso-icon">✅</div>
                <h2>Pagamento Aprovado!</h2>
                <p>Obrigado pela sua compra, <strong>${detalhes.payer.name.given_name}</strong>!</p>
                <p>Seu pedido <strong>#${detalhes.id}</strong> foi confirmado.</p>
                <div class="sucesso-detalhes">
                    <p><strong>Produto:</strong> ${produtoInfo.nome}</p>
                    <p><strong>Valor:</strong> ${formatarMoeda(valorProduto)}</p>
                    <p><strong>Status:</strong> ${detalhes.status}</p>
                </div>
                <p class="sucesso-email">Um e-mail de confirmação foi enviado para: <strong>${detalhes.payer.email_address}</strong></p>
                <a href="produtos.html" class="btn btn-primary">Continuar Comprando</a>
            </div>
        `;
    }

    // ========================================
    // MÁSCARAS DE INPUT
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
    // SELEÇÃO DE MÉTODO DE PAGAMENTO
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
    // BOTÃO WHATSAPP
    // ========================================
    btnWhatsApp.addEventListener('click', function () {
        if (!validarFormulario()) return;

        const nome = document.getElementById('nome').value;
        const mensagem = encodeURIComponent(
            `Olá! Gostaria de finalizar a compra do produto *${produtoInfo.nome}*.\n\n` +
            `*Dados do Cliente:*\n` +
            `Nome: ${nome}\n` +
            `CPF: ${document.getElementById('cpf').value}\n` +
            `Telefone: ${document.getElementById('telefone').value}\n` +
            `E-mail: ${document.getElementById('email').value}\n\n` +
            `*Endereço:*\n` +
            `${document.getElementById('endereco').value}\n` +
            `${document.getElementById('bairro').value} - ${document.getElementById('cidade').value}/${document.getElementById('estado').value}\n` +
            `CEP: ${document.getElementById('cep').value}\n\n` +
            `*Valor:* ${formatarMoeda(valorProduto)}`
        );

        window.open(`https://wa.me/5511956970564?text=${mensagem}`, '_blank');
    });

    // ========================================
    // GERAR OPÇÕES DE PARCELAMENTO
    // ========================================
    function gerarOpcoesParcelamento(valor) {
        const container = document.getElementById('parcelamentoOptions');
        container.innerHTML = '';

        // Opções de parcelamento: 1x, 2x, 3x, 4x, 5x, 6x
        const opcoes = [];
        for (let i = 1; i <= 6; i++) {
            const valorParcela = valor / i;
            opcoes.push({
                parcelas: i,
                valorParcela: valorParcela,
                texto: i === 1 
                    ? `1x de ${formatarMoeda(valorParcela)} à vista`
                    : `${i}x de ${formatarMoeda(valorParcela)} sem juros`
            });
        }

        // Criar radio buttons para cada opção
        opcoes.forEach((opcao, index) => {
            const label = document.createElement('label');
            label.className = `parcelamento-option ${index === 0 ? 'active' : ''}`;
            label.innerHTML = `
                <input type="radio" name="parcelamento" value="${opcao.parcelas}" ${index === 0 ? 'checked' : ''}>
                <div class="parcelamento-card">
                    <span class="parcelas-numero">${opcao.parcelas}x</span>
                    <span class="parcelas-info">${opcao.texto}</span>
                </div>
            `;
            container.appendChild(label);

            // Evento de clique
            label.addEventListener('click', function() {
                document.querySelectorAll('.parcelamento-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                parcelasSelecionadas = opcao.parcelas;
                atualizarTotal(opcao.parcelas);
                
                // Recriar botões do PayPal com novo valor
                inicializarPayPal();
            });
        });
    }

    // ========================================
    // ATUALIZAR TOTAL BASEADO NAS PARCELAS
    // ========================================
    function atualizarTotal(parcelas) {
        const valorParcela = valorProduto / parcelas;
        const totalElement = document.getElementById('resumo-total');
        const parcelasElement = document.getElementById('resumo-parcelas');
        
        if (parcelas === 1) {
            totalElement.textContent = formatarMoeda(valorProduto);
            parcelasElement.textContent = `Pagamento à vista`;
        } else {
            totalElement.textContent = formatarMoeda(valorParcela);
            parcelasElement.textContent = `${parcelas}x de ${formatarMoeda(valorParcela)} sem juros`;
        }
    }

    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function validarFormulario() {
        const campos = ['nome', 'email', 'telefone', 'cpf', 'endereco', 'bairro', 'cidade', 'estado', 'cep'];

        for (const campo of campos) {
            const input = document.getElementById(campo);
            if (!input.value.trim()) {
                input.focus();
                alert(`Por favor, preencha o campo: ${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
                return false;
            }
        }

        // Validar CPF
        const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            alert('CPF inválido');
            document.getElementById('cpf').focus();
            return false;
        }

        // Validar CEP
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (cep.length !== 8) {
            alert('CEP inválido');
            document.getElementById('cep').focus();
            return false;
        }

        return true;
    }

});
