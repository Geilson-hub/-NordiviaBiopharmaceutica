/**
 * =====================================================
 * CHECKOUT - Sistema de Pagamento
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // CONFIGURAÇÃO STRIPE (MODO TESTE)
    // ========================================
    // IMPORTANTE: Substitua pela sua chave pública do Stripe
    // Para teste, use a chave public_test do seu painel Stripe
    const STRIPE_PUBLIC_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx'; // Chave de teste do Stripe
    const STRIPE_PRICE_ID = 'price_XXXXXXXXXXXXXXXX'; // Substitua pelo ID do preço no Stripe

    let stripe = null;
    try {
        stripe = Stripe(STRIPE_PUBLIC_KEY);
    } catch (e) {
        console.log('Stripe não configurado usando modo de teste');
    }

    // ========================================
    // DADOS DOS PRODUTOS (PREÇOS DE TESTE)
    // ========================================
    const precos = {
        'adipotide-5mg': { valor: 450.00, nome: 'Adipotide-5mg' },
        'aod-9604-5mg': { valor: 380.00, nome: 'AOD-9604-5mg' },
        'cjc-1295-with-dac-5mg': { valor: 420.00, nome: 'CJC-1295 with DAC-5mg' },
        'cjc-1295-without-dac-10mg': { valor: 480.00, nome: 'CJC-1295 without DAC-10mg' },
        'follistatin-1mg': { valor: 520.00, nome: 'Follistatin-1mg' },
        'ghk-cu-100mg': { valor: 350.00, nome: 'GHK-Cu-100mg' },
        'glow-70mg': { valor: 290.00, nome: 'Glow-70mg' },
        'hcg-10000ui': { valor: 380.00, nome: 'HCG-10000UI' },
        'hgh-fragment-176-191-5mg': { valor: 420.00, nome: 'HGH Fragment 176-191-5mg' },
        'igf-1-lr3-1mg': { valor: 550.00, nome: 'IGF-1 LR3-1mg' },
        'ipamorelin-10mg': { valor: 480.00, nome: 'Ipamorelin-10mg' },
        'klow-80mg': { valor: 320.00, nome: 'Klow-80mg' },
        'lemon-bottle-10mg': { valor: 280.00, nome: 'Lemon Bottle-10mg' },
        'mots-c-40mg': { valor: 450.00, nome: 'MOTS-c-40mg' },
        'pinealon-20mg': { valor: 390.00, nome: 'Pinealon-20mg' },
        'pt-141-10mg': { valor: 350.00, nome: 'PT-141-10mg' },
        'retatrutide-60mg': { valor: 890.00, nome: 'Retatrutide-60mg' },
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
    }

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
                atualizarTotal(opcao.parcelas);
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
    const btnPagar = document.getElementById('btnPagar');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const parcelamentoSection = document.getElementById('parcelamentoSection');

    paymentOptions.forEach(option => {
        option.addEventListener('click', function () {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.querySelector('input').value;
            if (method === 'stripe') {
                btnPagar.style.display = 'inline-flex';
                btnWhatsApp.style.display = 'none';
                parcelamentoSection.classList.remove('hidden');
            } else {
                btnPagar.style.display = 'none';
                btnWhatsApp.style.display = 'inline-flex';
                parcelamentoSection.classList.add('hidden');
            }
        });
    });

    // ========================================
    // VALIDAÇÃO DO FORMULÁRIO
    // ========================================
    document.getElementById('checkoutForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const metodoPagamento = document.querySelector('input[name="pagamento"]:checked').value;

        if (metodoPagamento === 'stripe') {
            processarStripe();
        }
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
    // PROCESSAMENTO STRIPE (MODO TESTE)
    // ========================================
    function processarStripe() {
        // MODO TESTE - Simula checkout sem backend
        // Para produção, você precisa de um backend para criar a sessão

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Simular processamento
        btnPagar.disabled = true;
        btnPagar.innerHTML = '⏳ Processando...';

        setTimeout(() => {
            // Em produção, aqui você redirecionaria para o Stripe
            // Por enquanto, mostra mensagem de sucesso

            const mensagem = encodeURIComponent(
                `Olá! Finalizei a compra do produto *${produtoInfo.nome}* via cartão de crédito.\n\n` +
                `*Dados do Cliente:*\n` +
                `Nome: ${nome}\n` +
                `E-mail: ${email}\n` +
                `CPF: ${document.getElementById('cpf').value}\n` +
                `Telefone: ${document.getElementById('telefone').value}\n\n` +
                `*Endereço de Entrega:*\n` +
                `${document.getElementById('endereco').value}\n` +
                `${document.getElementById('bairro').value} - ${document.getElementById('cidade').value}/${document.getElementById('estado').value}\n` +
                `CEP: ${document.getElementById('cep').value}\n\n` +
                `*Valor Total:* ${formatarMoeda(valorProduto)}\n\n` +
                `Aguardo confirmação do pagamento.`
            );

            // Redirecionar para WhatsApp com dados do pedido
            window.open(`https://wa.me/5511956970564?text=${mensagem}`, '_blank');

            btnPagar.disabled = false;
            btnPagar.innerHTML = '💳 Pagar com Cartão';

        }, 2000);
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
