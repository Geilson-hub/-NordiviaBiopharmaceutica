const PRODUTOS_PADRAO = [
    {
        id: "adipotide-5mg",
        preco: 0,
        nome: "Adipotide-5mg",
        imagem: "./img/Adipotide.png",
        descricaoCompleta: "Adipotide is a synthetic protein analog that acts as an agonist of GPR119 and GPR55 receptors, both involved in lipid and carbohydrate metabolism. The drug was developed for the treatment of obesity and type 2 diabetes mellitus, and has shown promising results in clinical studies.",
        categoria: "Weight Loss",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "aod-9604-5mg",
        preco: 0,
        nome: "AOD-9604-5mg",
        imagem: "./img/AOD9604.png",
        descricaoCompleta: "Fragment of human growth hormone that stimulates lipolysis and inhibits lipogenesis. Used for weight loss and body composition improvement. AOD-9604 is fragment 176-191 of human growth hormone, responsible for lipolytic activity.",
        categoria: "Weight Loss",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "bpc-157-hero",
        preco: 0,
        nome: "BPC-157 Hero",
        imagem: "./img/BPC157.png",
        descricaoCompleta: "BPC-157 Hero is a synthetic peptide derived from a gastric juice protein. It has regenerative, anti-inflammatory and gastroprotective properties. Studies demonstrate its efficacy in tissue healing, muscle and tendon injury repair, and gastrointestinal tract protection.",
        categoria: "Regeneration",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "cagrilintide-hero",
        preco: 0,
        nome: "Cagrilintide Hero",
        imagem: "./img/Cagrilintide.png",
        descricaoCompleta: "Cagrilintide is a synthetic amylin analog with extended half-life. It works in conjunction with GLP-1 to promote satiety and weight reduction. Clinical studies demonstrate significant body weight reduction when combined with semaglutide.",
        categoria: "Weight Loss",
        dosagem: "2mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "cartalax-hero",
        preco: 0,
        nome: "Cartalax Hero",
        imagem: "./img/Cartalax.png",
        descricaoCompleta: "Cartalax is a synthetic peptide that stimulates the regeneration of cartilaginous and joint tissues. Promotes collagen and proteoglycan synthesis, being studied for osteoarthritis and degenerative joint injuries.",
        categoria: "Regeneration",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "cerebrolysin-hero",
        preco: 0,
        nome: "Cerebrolysin Hero",
        imagem: "./img/Cerebrolysin.png",
        descricaoCompleta: "Cerebrolysin is a mixture of nootropic peptides derived from porcine brain. It has neuroprotective, neurotrophic and neuromodulatory properties. It is used to improve cognition, memory and neurological recovery in conditions such as stroke and dementia.",
        categoria: "Cognitive Health",
        dosagem: "5ml",
        formaApresentacao: "Injectable solution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "36 months"
    },
    {
        id: "cido-hialur-nico-hero",
        preco: 0,
        nome: "Ácido Hialurônico Hero",
        imagem: "./img/Hyaluronic Acid.png",
        descricaoCompleta: "Hyaluronic Acid is a natural molecule present in skin and connective tissues. It has high water retention capacity, promoting deep hydration, wrinkle filling and improved skin elasticity. Used in aesthetic and dermatological procedures.",
        categoria: "Anti-aging",
        dosagem: "5ml",
        formaApresentacao: "Injectable solution",
        armazenamento: "Room temperature",
        prazoValidade: "24 months"
    },
    {
        id: "cjc-1295-hero",
        preco: 0,
        nome: "CJC-1295 Hero",
        imagem: "./img/CJC1295.png",
        descricaoCompleta: "CJC-1295 is a growth hormone releasing hormone (GHRH) analog with extended half-life. Stimulates sustained GH release, promoting sleep, muscle recovery, fat burning and anti-aging. The DAC (Drug Affinity Complex) prolongs action for up to 6-8 days.",
        categoria: "Growth Hormone",
        dosagem: "2mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "cjc-1295-with-dac-5mg",
        preco: 0,
        nome: "CJC-1295 with DAC-5mg",
        imagem: "./img/CJC1295 DAC.png",
        descricaoCompleta: "Growth hormone releasing hormone (GHRH) analog. Stimulates sustained GH release, promoting sleep, muscle recovery and fat burning. The DAC (Drug Affinity Complex) extends the compound's half-life to up to 6-8 days.",
        categoria: "Growth Hormone",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "dsip-hero",
        preco: 0,
        nome: "DSIP Hero",
        imagem: "./img/Dsip.png",
        descricaoCompleta: "DSIP (Delta Sleep-Inducing Peptide) is a neuropeptide that induces slow-wave sleep. It has anxiolytic, circadian rhythm regulating and neuroprotective properties. Used for treatment of insomnia and sleep disorders.",
        categoria: "Cognitive Health",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "epithalon-hero",
        preco: 0,
        nome: "Epithalon Hero",
        imagem: "./img/Epithalon.png",
        descricaoCompleta: "Epithalon (Epitalon) is a synthetic tetrapeptide that stimulates the telomerase enzyme, increasing telomere length. Promotes cellular rejuvenation, improved immunity and extended lifespan. It is one of the most studied compounds in longevity research.",
        categoria: "Longevity",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "follistatin-hero",
        preco: 0,
        nome: "Follistatin Hero",
        imagem: "./img/Follistatin.png",
        descricaoCompleta: "Follistatin Hero is an advanced Follistatin formulation that inhibits myostatin, promoting significant muscle growth. Used for muscle mass increase, sarcopenia treatment and athletic performance improvement.",
        categoria: "Muscle Growth",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "ghk-cu-skin-care-hero",
        preco: 0,
        nome: "GHK-Cu Skin Care Hero",
        imagem: "./img/GHK-CU.png",
        descricaoCompleta: "GHK-Cu Skin Care is an advanced topical copper-tripeptide complex formulation. Stimulates collagen and elastin production, improves skin elasticity, reduces wrinkles and promotes visible skin rejuvenation.",
        categoria: "Anti-aging",
        dosagem: "30ml",
        formaApresentacao: "Topical solution",
        armazenamento: "Room temperature",
        prazoValidade: "12 months"
    },

    {
        id: "glow-hero",
        preco: 0,
        nome: "Glow Hero",
        imagem: "./img/Glow.png",
        descricaoCompleta: "Glow Hero is a premium bioactive peptide formulation for skincare. Promotes luminosity, elasticity and deep skin hydration, combating signs of aging and improving skin texture.",
        categoria: "Anti-aging",
        dosagem: "50mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "hcg-hero",
        preco: 0,
        nome: "HCG Hero",
        imagem: "./img/HCG.png",
        descricaoCompleta: "HCG Hero is a premium presentation of human chorionic gonadotropin. Used to stimulate endogenous testosterone production, preserve fertility during anabolic cycles and assist in fat burning.",
        categoria: "Hormone",
        dosagem: "5000UI",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "hgh-fragment-176-191-hero",
        preco: 0,
        nome: "HGH Fragment 176-191 Hero",
        imagem: "./img/HGH Fragment.png",
        descricaoCompleta: "HGH Fragment 176-191 Hero is an advanced formulation of the active growth hormone fragment focused exclusively on lipolysis. Promotes potent fat burning without tissue growth side effects.",
        categoria: "Weight Loss",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "hgh-somatropina-hero",
        preco: 0,
        nome: "HGH Somatropina Hero",
        imagem: "./img/HGH.png",
        descricaoCompleta: "Somatropina Hero é o hormônio do crescimento humano (HGH) recombinante de alta pureza. Estimula crescimento muscular, queima de gordura, regeneração tecidual e anti-aging. Indicado para deficiência de GH, performance atlética e rejuvenescimento.",
        categoria: "Growth Hormone",
        dosagem: "10UI",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "igf-1-lr3-hero",
        preco: 0,
        nome: "IGF-1 LR3 Hero",
        imagem: "./img/IGF-1LR3.png",
        descricaoCompleta: "IGF-1 LR3 Hero is an advanced formulation of insulin-like growth factor type 1 with extended half-life. Stimulates muscle hyperplasia, tissue regeneration and post-exercise recovery. Indicated for athletes and muscle growth protocols.",
        categoria: "Muscle Growth",
        dosagem: "1mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "igf-des-hero",
        preco: 0,
        nome: "IGF-DES Hero",
        imagem: "./img/IGF-DES.png",
        descricaoCompleta: "IGF-DES (Decarboxylated) is a fast-acting form of IGF-1. Stimulates muscle regeneration, tissue repair and cell growth. It has a short half-life, making it ideal for post-workout recovery protocols.",
        categoria: "Muscle Growth",
        dosagem: "1mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "ipamorelin-hero",
        preco: 0,
        nome: "Ipamorelin Hero",
        imagem: "./img/Ipamorelin.png",
        descricaoCompleta: "Ipamorelin Hero is a premium formulation of the most selective GH secretagogue available. Stimulates natural growth hormone release without affecting cortisol or appetite. Improves sleep, body composition and recovery.",
        categoria: "Growth Hormone",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "klow-hero",
        preco: 0,
        nome: "Klow Hero",
        imagem: "./img/Klow.png",
        descricaoCompleta: "Klow Hero is a premium lipolytic and anti-inflammatory formulation. Aids in localized fat reduction, improved insulin sensitivity and body composition. Indicated for advanced weight loss protocols.",
        categoria: "Weight Loss",
        dosagem: "80mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "kpv-hero",
        preco: 0,
        nome: "KPV Hero",
        imagem: "./img/KPV.png",
        descricaoCompleta: "KPV is an anti-inflammatory peptide derived from alpha-MSH. It has potent action in the gastrointestinal tract, being studied for treatment of ulcerative colitis, Crohn's disease and other inflammatory intestinal conditions.",
        categoria: "Anti-inflammatory",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "lemon-bottle-hero",
        preco: 0,
        nome: "Lemon Bottle Hero",
        imagem: "./img/Lemon Bottle.png",
        descricaoCompleta: "Lemon Bottle Hero is a premium high-concentration lipolytic formula. Combines amino acids, vitamins and cofactors to accelerate localized fat burning. Indicated for topical application in fat accumulation areas.",
        categoria: "Weight Loss",
        dosagem: "10ml",
        formaApresentacao: "Topical application solution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "12 months"
    },

    {
        id: "mots-c-hero",
        preco: 0,
        nome: "MOTS-c Hero",
        imagem: "./img/Mots-C.png",
        descricaoCompleta: "MOTS-c Hero is a premium mitochondrial peptide formulation. Regulates energy metabolism, improves insulin sensitivity and fat burning. Indicated for metabolic optimization and athletic performance.",
        categoria: "Metabolism",
        dosagem: "20mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "nadplus-hero",
        preco: 0,
        nome: "NAD+ Hero",
        imagem: "./img/NAD+.png",
        descricaoCompleta: "NAD+ (Nicotinamide Adenine Dinucleotide) is an essential coenzyme for cellular metabolism. Promotes longevity, DNA repair, mitochondrial function and cellular rejuvenation. Indicated for anti-aging and energy optimization.",
        categoria: "Longevity",
        dosagem: "500mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "pinealon-hero",
        preco: 0,
        nome: "Pinealon Hero",
        imagem: "./img/Pinealon.png",
        descricaoCompleta: "Pinealon Hero is a premium cytoprotective peptide formulation. Crosses the blood-brain barrier promoting neuronal protection, cognitive improvement and central nervous system regeneration.",
        categoria: "Cognitive Health",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "pt-141-hero",
        preco: 0,
        nome: "PT-141 Hero",
        imagem: "./img/PT-141.png",
        descricaoCompleta: "PT-141 Hero is a premium Bremelanotide formulation. Selective MC3R receptor agonist that acts on the central nervous system to increase libido and arousal in both sexes. Fast and potent results.",
        categoria: "Sexual Health",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "ptd-dbm-hero",
        preco: 0,
        nome: "PTD-DBM Hero",
        imagem: "./img/PTD-DBM.png",
        descricaoCompleta: "PTD-DBM is a nootropic peptide that crosses the blood-brain barrier. Promotes improved memory, focus and cognitive function. Used for mental optimization and treatment of neurodegenerative conditions.",
        categoria: "Cognitive Health",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "retatrutida-hero",
        preco: 0,
        nome: "Retatrutide Hero",
        imagem: "./img/Retatrutide.png",
        descricaoCompleta: "Retatrutide Hero is a triple agonist of GLP-1, GIP and glucagon receptors. Potent promoter of weight loss and metabolic improvement, being one of the most promising compounds for obesity and type 2 diabetes.",
        categoria: "Weight Loss",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "semax-hero",
        preco: 0,
        nome: "Semax Hero",
        imagem: "./img/Semax.png",
        descricaoCompleta: "Semax is a synthetic nootropic peptide derived from ACTH. Promotes neuroprotection, improved memory, focus and cognition, acting on neurotrophic factors in the central nervous system.",
        categoria: "Cognitive Health",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },

    {
        id: "slu-pp-332-5mg",
        preco: 0,
        nome: "SLU-PP-332-5mg",
        imagem: "./img/Slu-pp-332.png",
        descricaoCompleta: "ERRγ receptor agonist that stimulates mitochondrial biogenesis. Improves muscle endurance and oxidative capacity, being studied for aging and performance. SLU-PP-332 activates longevity extension pathways.",
        categoria: "Longevity",
        dosagem: "5mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "ss-31-10mg",
        preco: 0,
        nome: "SS-31-10mg",
        imagem: "./img/SS-31.png",
        descricaoCompleta: "Mitochondrial peptide that protects against oxidative stress. Improves mitochondrial function, being studied for neurodegenerative diseases and aging. SS-31 (Elamipretide) is selective above the inner mitochondrial membrane.",
        categoria: "Mitochondrial Health",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "tesamorelin-10mg",
        preco: 0,
        nome: "Tesamorelin-10mg",
        imagem: "./img/Tesamorelin.png",
        descricaoCompleta: "GHRH analog approved for abdominal fat reduction in HIV patients. Stimulates GH release in a physiological manner. Tesamorelin is FDA-approved for HIV-associated lipodystrophy.",
        categoria: "Growth Hormone",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "thymosin-alpha1-10mg",
        preco: 0,
        nome: "Thymosin Alpha-1-10mg",
        imagem: "./img/Thymosin Alpha 1.png",
        descricaoCompleta: "Thymosin Alpha-1 is a 28-amino acid peptide naturally present in the thymus. Strengthens immune response, being used in viral infections, cancer and as a vaccine adjuvant. Thymosin Alpha-1 is an immunomodulatory peptide derived from the thymus.",
        categoria: "Immune System",
        dosagem: "10mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "tirzepatide-15mg",
        preco: 0,
        nome: "Tirzepatide-15mg",
        imagem: "./img/Tirzepatide.png",
        descricaoCompleta: "Dual agonist of GLP-1 and GIP receptors. Excellent results in weight loss and glycemic control, being one of the most effective options for obesity and type 2 diabetes. Tirzepatide is a synthetic 39-amino acid peptide.",
        categoria: "Weight Loss",
        dosagem: "15mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
    },
    {
        id: "tirzepatide-60mg",
        preco: 0,
        nome: "Tirzepatide-60mg",
        imagem: "./img/Tirzepatide.png",
        descricaoCompleta: "Higher dose presentation of Tirzepatide. Dual GLP-1/GIP agonist for advanced weight loss and metabolic control protocols. This presentation allows higher dosages for patients requiring intensive treatment.",
        categoria: "Weight Loss",
        dosagem: "60mg",
        formaApresentacao: "Lyophilized powder for reconstitution",
        armazenamento: "Refrigerated (2-8°C)",
        prazoValidade: "24 months"
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
        console.error('Could not load products from server:', e);
    }
    produtos = PRODUTOS_PADRAO;
})();

window.PRODUTOS_PROMISE = PRODUTOS_PROMISE;
