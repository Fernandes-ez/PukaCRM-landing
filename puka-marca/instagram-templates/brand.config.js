"use strict";

// Config central da marca "A Deixa" (Puka CRM). Mude cores/fontes aqui e
// rode `node generate-templates.js` de novo — nada mais no projeto lê
// hex/nome de fonte direto, tudo passa por este arquivo.
//
// Fonte da verdade: puka-marca/puka-manual.html. Se este arquivo divergir
// do manual, o manual vence — ajuste aqui.

module.exports = {
  color: {
    roteiro: "#F4EEE4",
    coxia: "#1E1B24",
    ponto: "#2D3F9E",
    ribalta: "#D2502D",
    ribaltaFunda: "#A83A1C",
    ribaltaAcesa: "#E8704A",
    pontoClaro: "#8E9BE0",
    rotunda: "#E6DCCB",
    papel: "#FBF8F2",
    bastidor: "#5E5868",
    linha: "#D9CDB9",
  },

  // A paleta de cada peça deve somar perto de 100% nesta proporção
  // (regra 60/25/10/5 do manual, seção 06 · Cores).
  proportion: { roteiroOuCoxia: 0.6, textoEstrutura: 0.25, ponto: 0.1, ribalta: 0.05 },

  // Caminhos são relativos à raiz deste projeto (puka-marca/instagram-templates/).
  font: {
    display: {
      bold: {
        file: "../fonts/ttf/BricolageGrotesque-Bold.ttf",
        family: "Bricolage Grotesque Bold",
        postscriptName: "BricolageGrotesque-Bold",
        weight: 700,
      },
      extraBold: {
        file: "../fonts/ttf/BricolageGrotesque-ExtraBold.ttf",
        family: "Bricolage Grotesque ExtraBold",
        postscriptName: "BricolageGrotesque-ExtraBold",
        weight: 800,
      },
    },
    texto: {
      regular: {
        file: "../fonts/ttf/AtkinsonHyperlegibleNext-Regular.ttf",
        family: "Atkinson Hyperlegible Next",
        postscriptName: "AtkinsonHyperlegibleNext-Regular",
        weight: 400,
      },
      bold: {
        file: "../fonts/ttf/AtkinsonHyperlegibleNext-Bold.ttf",
        family: "Atkinson Hyperlegible Next Bold",
        postscriptName: "AtkinsonHyperlegibleNext-Bold",
        weight: 700,
      },
    },
    mono: {
      regular: {
        file: "../fonts/ttf/AtkinsonHyperlegibleMono-Regular.ttf",
        family: "Atkinson Hyperlegible Mono",
        postscriptName: "AtkinsonHyperlegibleMono-Regular",
        weight: 400,
      },
      medium: {
        file: "../fonts/ttf/AtkinsonHyperlegibleMono-Medium.ttf",
        family: "Atkinson Hyperlegible Mono Medium",
        postscriptName: "AtkinsonHyperlegibleMono-Medium",
        weight: 500,
      },
    },
  },

  // ponytail: instância opsz=96 pedida no briefing não foi gerada — este
  // ambiente não tem Python/fonttools instalado. Usando os estáticos
  // Bold/ExtraBold que o Google Fonts já publica (peso correto, é só o
  // eixo óptico que fica no default do arquivo em vez de travado em 96).
  // Upgrade: instalar fonttools e rodar varLib.instancer no
  // BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf se a diferença
  // incomodar em título grande.

  logo: {
    principalCor: "../logo/puka-principal-cor.svg",
    principalNegativo: "../logo/puka-principal-negativo.svg",
    principalNegativoMono: "../logo/puka-principal-negativo-mono.svg",
    simboloCor: "../logo/puka-simbolo-cor.svg",
    simboloNegativo: "../logo/puka-simbolo-negativo.svg",
    verticalCor: "../logo/puka-vertical-cor.svg",
  },

  // Path bruto da deixa (braço do k) e da haste, extraídos de
  // puka-simbolo-cor.svg. viewBox original: "33 -694 479 694" com
  // transform="scale(1 -1)" — width/height abaixo já são as dimensões
  // reais do símbolo (479x694) para reuso sem precisar reabrir o SVG.
  simbolo: {
    viewBoxWidth: 479,
    viewBoxHeight: 694,
    hastePath: "M33.0 0V694H183.0V0Z",
    deixaPath:
      "M364 527C318 450 221.02 344 221.02 270C221.02 192 280 86 312 0H512C458 92 386 180 386 262C386 334 452 440 498 527Z",
  },

  icon: {
    dir: "../icones",
    files: {
      agenda: "agenda.svg",
      conversa: "conversa.svg",
      deixa: "deixa.svg",
      equipe: "equipe.svg",
      etapas: "etapas.svg",
      historico: "historico.svg",
      lead: "lead.svg",
      ponto: "ponto.svg",
    },
  },

  padrao: {
    claro: "../padrao/puka-padrao-claro.svg",
    escuro: "../padrao/puka-padrao-escuro.svg",
  },

  // Sistema haste/lacuna (seção 08 do manual). lacunaUnit = 1/4 da haste.
  system: {
    hasteWidthFeed: 10, // px na escala do feed (1080px) — haste "estrutural" fina
    lacunaUnit: 2.5, // 1/4 de hasteWidthFeed
    borderRadius: 0, // corte seco em tudo, regra do manual
  },

  canvas: {
    feed: { width: 1080, height: 1350, margin: 80 },
    story: { width: 1080, height: 1920, safeZone: 250 },
  },
};
