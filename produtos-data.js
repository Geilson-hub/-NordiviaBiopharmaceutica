const PRODUTOS_PADRAO = [
    {
        id: "adipotide-5mg",
        preco: 450,
        nome: "Adipotide-5mg",
        imagem: "./img/adipotide-5mg.png",
        descricaoCompleta: "Adipotide é um análogo sintético da proteína, age como um agonista dos receptores GPR119 e GPR55, ambos envolvidos no metabolismo de lipídeos e carboidratos. O medicamento foi desenvolvido para o tratamento da obesidade e da diabetes mellitus tipo 2, e tem demonstrado resultados promissores em estudos clínicos.",
        categoria: "Perda de Peso",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "aod-9604-5mg",
        preco: 380,
        nome: "AOD-9604-5mg",
        imagem: "./img/aod-9604-5mg.png",
        descricaoCompleta: "Fragmento do hormônio do crescimento humano que estimula a lipólise e inibe a lipogênese. Utilizado para perda de peso e melhora da composição corporal. O AOD-9604 é o fragmento 176-191 do hormônio do crescimento humano, responsável pela atividade lipolítica.",
        categoria: "Perda de Peso",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "bpc-157-hero",
        preco: 420,
        nome: "BPC-157 Hero",
        imagem: "./img/bpc-157-hero.png",
        descricaoCompleta: "BPC-157 Hero é um peptídeo sintético derivado de uma proteína do suco gástrico. Possui propriedades regenerativas, anti-inflamatórias e gastroprotetoras. Estudos demonstram sua eficácia na cicatrização de tecidos, reparo de lesões musculares e tendíneas, além de proteção do trato gastrointestinal.",
        categoria: "Regeneração",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "cagrilintide-hero",
        preco: 650,
        nome: "Cagrilintide Hero",
        imagem: "./img/cagrilintide-hero.png",
        descricaoCompleta: "Cagrilintide é um análogo da amilina sintética com meia-vida prolongada. Age em conjunto com o GLP-1 para promover saciedade e redução de peso. Estudos clínicos demonstram redução significativa do peso corporal quando combinado com semaglutida.",
        categoria: "Perda de Peso",
        dosagem: "2mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "cartalax-hero",
        preco: 380,
        nome: "Cartalax Hero",
        imagem: "./img/cartalax-hero.png",
        descricaoCompleta: "Cartalax é um peptídeo sintético que estimula a regeneração de tecidos cartilaginosos e articulares. Promove a síntese de colágeno e proteoglicanos, sendo estudado para osteoartrite e lesões articulares degenerativas.",
        categoria: "Regeneração",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "cerebrolysin-hero",
        preco: 520,
        nome: "Cerebrolysin Hero",
        imagem: "./img/cerebrolysin-hero.png",
        descricaoCompleta: "Cerebrolysin é uma mistura de peptídeos nootrópicos derivados do cérebro suíno. Possui propriedades neuroprotetoras, neurotróficas e neuromoduladoras. É utilizado para melhorar cognição, memória e recuperação neurológica em condições como AVC e demência.",
        categoria: "Saúde Cognitiva",
        dosagem: "5ml",
        formaApresentacao: "Solução injetável",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "36 meses"
    },
    {
        id: "cido-hialur-nico-hero",
        preco: 350,
        nome: "Ácido Hialurônico Hero",
        imagem: "./img/cido-hialur-nico-hero.png",
        descricaoCompleta: "Ácido Hialurônico é uma molécula natural presente na pele e tecidos conjuntivos. Possui alta capacidade de retenção de água, promovendo hidratação profunda, preenchimento de rugas e melhora da elasticidade cutânea. Utilizado em procedimentos estéticos e dermatológicos.",
        categoria: "Anti-aging",
        dosagem: "5ml",
        formaApresentacao: "Solução injetável",
        armazenamento: "Temperatura ambiente",
        prazoValidade: "24 meses"
    },
    {
        id: "cjc-1295-hero",
        preco: 420,
        nome: "CJC-1295 Hero",
        imagem: "./img/cjc-1295-hero.png",
        descricaoCompleta: "CJC-1295 é um análogo do hormônio liberador de hormônio do crescimento (GHRH) com meia-vida prolongada. Estimula a liberação sustentada de GH, promovendo sono, recuperação muscular, queima de gordura e anti-aging. O DAC (Drug Affinity Complex) prolonga a ação por até 6-8 dias.",
        categoria: "Hormônio do Crescimento",
        dosagem: "2mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "cjc-1295-with-dac-5mg",
        preco: 420,
        nome: "CJC-1295 with DAC-5mg",
        imagem: "./img/cjc-1295-with-dac-5mg.jpeg",
        descricaoCompleta: "Análogo do hormônio liberador de hormônio do crescimento (GHRH). Estimula a liberação sustentada de GH, promovendo sono, recuperação muscular e queima de gordura. O DAC (Drug Affinity Complex) prolonga a meia-vida do composto para até 6-8 dias.",
        categoria: "Hormônio do Crescimento",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "dsip-hero",
        preco: 320,
        nome: "DSIP Hero",
        imagem: "./img/dsip-hero.png",
        descricaoCompleta: "DSIP (Delta Sleep-Inducing Peptide) é um neuropeptídeo que induz o sono de ondas lentas. Possui propriedades ansiolíticas, reguladoras do ritmo circadiano e neuroprotetoras. Utilizado para tratamento de insônia e distúrbios do sono.",
        categoria: "Saúde Cognitiva",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "epithalon-hero",
        preco: 580,
        nome: "Epithalon Hero",
        imagem: "./img/epithalon-hero.png",
        descricaoCompleta: "Epithalon (Epitalon) é um tetrapeptídeo sintético que estimula a enzima telomerase, aumentando o comprimento dos telômeros. Promove rejuvenescimento celular, melhora da imunidade e extensão da expectativa de vida. É um dos compostos mais estudados em pesquisa de longevidade.",
        categoria: "Longevidade",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "follistatin-hero",
        preco: 620,
        nome: "Follistatin Hero",
        imagem: "./img/follistatin-hero.png",
        descricaoCompleta: "Follistatin Hero é uma formulação avançada de Follistatin que inibe a miostatina, promovendo crescimento muscular significativo. Utilizado para aumento de massa muscular, tratamento de sarcopenia e melhora da performance atlética.",
        categoria: "Crescimento Muscular",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "ghk-cu-skin-care-hero",
        preco: 280,
        nome: "GHK-Cu Skin Care Hero",
        imagem: "./img/ghk-cu-skin-care-hero.png",
        descricaoCompleta: "GHK-Cu Skin Care é uma formulação tópica avançada de complexo de cobre-tripeptídeo. Estimula a produção de colágeno e elastina, melhora a elasticidade da pele, reduz rugas e promove rejuvenescimento cutâneo visível.",
        categoria: "Anti-aging",
        dosagem: "30ml",
        formaApresentacao: "Solução tópica",
        armazenamento: "Temperatura ambiente",
        prazoValidade: "12 meses"
    },

    {
        id: "glow-hero",
        preco: 350,
        nome: "Glow Hero",
        imagem: "./img/glow-hero.png",
        descricaoCompleta: "Glow Hero é uma formulação premium de peptídeos bioativos para skincare. Promove luminosidade, elasticidade e hidratação profunda da pele, combatendo sinais de envelhecimento e melhorando a textura cutânea.",
        categoria: "Anti-aging",
        dosagem: "50mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "hcg-hero",
        preco: 320,
        nome: "HCG Hero",
        imagem: "./img/hcg-hero.png",
        descricaoCompleta: "HCG Hero é uma apresentação premium de gonadotrofina coriônica humana. Utilizada para estimular a produção de testosterona endógena, preservar a fertilidade durante ciclos anabólicos e auxiliar na queima de gordura.",
        categoria: "Hormônio",
        dosagem: "5000UI",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "hgh-fragment-176-191-hero",
        preco: 450,
        nome: "HGH Fragment 176-191 Hero",
        imagem: "./img/hgh-fragment-176-191-hero.png",
        descricaoCompleta: "HGH Fragment 176-191 Hero é uma formulação avançada do fragmento ativo do hormônio do crescimento focada exclusivamente em lipólise. Promove queima de gordura potente sem efeitos colaterais de crescimento de tecidos.",
        categoria: "Perda de Peso",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "hgh-somatropina-hero",
        preco: 850,
        nome: "HGH Somatropina Hero",
        imagem: "./img/hgh-somatropina-hero.png",
        descricaoCompleta: "Somatropina Hero é o hormônio do crescimento humano (HGH) recombinante de alta pureza. Estimula crescimento muscular, queima de gordura, regeneração tecidual e anti-aging. Indicado para deficiência de GH, performance atlética e rejuvenescimento.",
        categoria: "Hormônio do Crescimento",
        dosagem: "10UI",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "igf-1-lr3-hero",
        preco: 620,
        nome: "IGF-1 LR3 Hero",
        imagem: "./img/igf-1-lr3-hero.png",
        descricaoCompleta: "IGF-1 LR3 Hero é uma formulação avançada de fator de crescimento insulínico tipo 1 com meia-vida prolongada. Estimula hiperplasia muscular, regeneração tecidual e recuperação pós-exercício. Indicado para atletas e protocolos de crescimento muscular.",
        categoria: "Crescimento Muscular",
        dosagem: "1mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "igf-des-hero",
        preco: 480,
        nome: "IGF-DES Hero",
        imagem: "./img/igf-des-hero.png",
        descricaoCompleta: "IGF-DES (Descarboxilado) é uma forma de IGF-1 de ação rápida. Estimula regeneração muscular, reparo tecidual e crescimento celular. Possui meia-vida curta, sendo ideal para protocolos de recuperação pós-treino.",
        categoria: "Crescimento Muscular",
        dosagem: "1mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "ipamorelin-hero",
        preco: 520,
        nome: "Ipamorelin Hero",
        imagem: "./img/ipamorelin-hero.png",
        descricaoCompleta: "Ipamorelin Hero é uma formulação premium do secretagogo de GH mais seletivo disponível. Estimula a liberação natural de hormônio do crescimento sem afetar cortisol ou appetite. Melhora sono, composição corporal e recuperação.",
        categoria: "Hormônio do Crescimento",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "klow-hero",
        preco: 380,
        nome: "Klow Hero",
        imagem: "./img/klow-hero.png",
        descricaoCompleta: "Klow Hero é uma formulação premium lipolítica e anti-inflamatória. Auxilia na redução de gordura localizada, melhora da sensibilidade insulínica e composição corporal. Indicado para protocolos avançados de perda de peso.",
        categoria: "Perda de Peso",
        dosagem: "80mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "kpv-hero",
        preco: 350,
        nome: "KPV Hero",
        imagem: "./img/kpv-hero.png",
        descricaoCompleta: "KPV é um peptídeo anti-inflamatório derivado da alfa-MSH. Possui ação potente no trato gastrointestinal, sendo estudado para tratamento de colite ulcerativa, doença de Crohn e outras condições inflamatórias intestinais.",
        categoria: "Anti-inflamatório",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "lemon-bottle-hero",
        preco: 320,
        nome: "Lemon Bottle Hero",
        imagem: "./img/lemon-bottle-hero.png",
        descricaoCompleta: "Lemon Bottle Hero é uma fórmula lipolítica premium de alta concentração. Combina aminoácidos, vitaminas e cofatores para acelerar a queima de gordura localizada. Indicado para aplicação tópica em áreas de acúmulo de gordura.",
        categoria: "Perda de Peso",
        dosagem: "10ml",
        formaApresentacao: "Solução para aplicação tópica",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "12 meses"
    },

    {
        id: "mots-c-hero",
        preco: 480,
        nome: "MOTS-c Hero",
        imagem: "./img/mots-c-hero.png",
        descricaoCompleta: "MOTS-c Hero é uma formulação premium de peptídeo mitocondrial. Regula o metabolismo energético, melhora a sensibilidade insulínica e a queima de gordura. Indicado para otimização metabólica e performance atlética.",
        categoria: "Metabolismo",
        dosagem: "20mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "nadplus-hero",
        preco: 580,
        nome: "NAD+ Hero",
        imagem: "./img/nadplus-hero.png",
        descricaoCompleta: "NAD+ (Nicotinamida Adenina Dinucleotídeo) é uma coenzima essencial para o metabolismo celular. Promove longevidade, reparo de DNA, função mitocondrial e rejuvenescimento celular. Indicado para anti-aging e otimização energética.",
        categoria: "Longevidade",
        dosagem: "500mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "pinealon-hero",
        preco: 420,
        nome: "Pinealon Hero",
        imagem: "./img/pinealon-hero.png",
        descricaoCompleta: "Pinealon Hero é uma formulação premium de peptídeo citoprotetor. Penetra a barreira hematoencefálica promovendo proteção neuronal, melhora cognitiva e regeneração do sistema nervoso central.",
        categoria: "Saúde Cognitiva",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "pt-141-hero",
        preco: 420,
        nome: "PT-141 Hero",
        imagem: "./img/pt-141-hero.png",
        descricaoCompleta: "PT-141 Hero é uma formulação premium de Bremelanotide. Agonista seletivo do receptor MC3R que atua no sistema nervoso central para aumentar a libido e excitação em ambos os sexos. Resultados rápidos e potentes.",
        categoria: "Saúde Sexual",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "ptd-dbm-hero",
        preco: 480,
        nome: "PTD-DBM Hero",
        imagem: "./img/ptd-dbm-hero.png",
        descricaoCompleta: "PTD-DBM é um peptídeo nootrópico que atravessa a barreira hematoencefálica. Promove melhora da memória, foco e função cognitiva. Utilizado para otimização mental e tratamento de condições neurodegenerativas.",
        categoria: "Saúde Cognitiva",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "retatrutida-hero",
        preco: 780,
        nome: "Retatrutide Hero",
        imagem: "./img/retatrutida-hero.png",
        descricaoCompleta: "Retatrutide Hero é um agonista tripla de receptores GLP-1, GIP e glucagon. Potente promotor de perda de peso e melhora metabólica, sendo um dos compostos mais promissores para obesidade e diabetes tipo 2.",
        categoria: "Perda de Peso",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "semax-hero",
        preco: 380,
        nome: "Semax Hero",
        imagem: "./img/semax-hero.png",
        descricaoCompleta: "Semax é um nootrópico peptídico sintético derivado do ACTH. Promove neuroproteção, melhora da memória, foco e cognição, atuando sobre fatores neurotróficos no sistema nervoso central.",
        categoria: "Saúde Cognitiva",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },

    {
        id: "slu-pp-332-5mg",
        preco: 420,
        nome: "SLU-PP-332-5mg",
        imagem: "./img/slu-pp-332-5mg.jpeg",
        descricaoCompleta: "Agonista do receptor ERRγ que estimula a biogênese mitocondrial. Melhora a resistência muscular e a capacidade oxidativa, sendo estudado para envelhecimento e performance. O SLU-PP-332 ativa vias de extensão da longevidade.",
        categoria: "Longevidade",
        dosagem: "5mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "ss-31-10mg",
        preco: 380,
        nome: "SS-31-10mg",
        imagem: "./img/ss-31-10mg.jpeg",
        descricaoCompleta: "Peptídeo mitocondrial que protege contra o estresse oxidativo. Melhora a função mitocondrial, sendo estudado para doenças neurodegenerativas e envelhecimento. O SS-31 (Elamipretide) seleta acima da membrana mitocondrial interna.",
        categoria: "Saúde Mitochondrial",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "tesamorelin-10mg",
        preco: 450,
        nome: "Tesamorelin-10mg",
        imagem: "./img/tesamorelin-10mg.jpeg",
        descricaoCompleta: "Análogo do GHRH aprovado para redução de gordura abdominal em pacientes com HIV. Estimula a liberação de GH de forma fisiológica. A Tesamorelin é aprovada pela FDA para lipodistrofia associada ao HIV.",
        categoria: "Hormônio do Crescimento",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "thymosin-alpha1-10mg",
        preco: 520,
        nome: "Thymosin Alpha-1-10mg",
        imagem: "./img/thymosin-alpha1-10mg.jpeg",
        descricaoCompleta: "Peptídeo imunomodulador derivado do timo. Fortalece a resposta imunológica, sendo utilizado em infecções virais, câncer e como coadjuvante vacinal. A Thymosin Alpha-1 é um peptídeo de 28 aminoácidos naturally present no timo.",
        categoria: "Sistema Imunológico",
        dosagem: "10mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "tirzepatide-15mg",
        preco: 780,
        nome: "Tirzepatide-15mg",
        imagem: "./img/tirzepatide-15mg.jpeg",
        descricaoCompleta: "Agonista duplo de receptores GLP-1 e GIP. Excelente resultado em perda de peso e controle glicêmico, sendo uma das opções mais eficazes para obesidade e diabetes tipo 2. A Tirzepatide é um peptídeo sintético de 39 aminoácidos.",
        categoria: "Perda de Peso",
        dosagem: "15mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    },
    {
        id: "tirzepatide-60mg",
        preco: 2250,
        nome: "Tirzepatide-60mg",
        imagem: "./img/tirzepatide-60mg.jpeg",
        descricaoCompleta: "Apresentação de maior dose do Tirzepatide. Agonista duplo GLP-1/GIP para protocolos avançados de perda de peso e controle metabólico. Esta apresentação permite dosagens mais altas para pacientes que necessitam de tratamento intensivo.",
        categoria: "Perda de Peso",
        dosagem: "60mg",
        formaApresentacao: "Pó liofilizado para reconstituição",
        armazenamento: "Refrigerado (2-8°C)",
        prazoValidade: "24 meses"
    }
];

let produtos = [];

const PRODUTOS_PROMISE = (async function carregarProdutos() {
    try {
        const resp = await fetch('api/produtos');
        if (resp.ok) {
            const lista = await resp.json();
            if (Array.isArray(lista)) {
                produtos = lista;
                return;
            }
        }
    } catch (e) {
        console.error('Não foi possível carregar produtos do servidor:', e);
    }
    produtos = PRODUTOS_PADRAO;
})();

window.PRODUTOS_PROMISE = PRODUTOS_PROMISE;
