"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED } = require("./_shared");

module.exports = {
  slug: "feed_antes_depois_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: false };
    const m = FEED.margin;
    const midY = doc.height / 2;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Roteiro_topo", doc, x: 0, y: 0, w: doc.width, h: midY, color: brand.color.rotunda }),
      L.rectLayer({ name: "Roteiro_base", doc, x: 0, y: midY, w: doc.width, h: doc.height - midY, color: brand.color.roteiro }),
    ]);

    // a linha de passagem faz a virada entre os dois blocos — reto em
    // Ponto (era só sistema, sem IA), lacuna, curva em Ribalta (a Puka
    // entrando em cena).
    const grafismos = group("Grafismos", [
      L.linhaPassagemLayer({ name: "Linha_passagem", doc, x: m, y: midY, width: doc.width - m * 2, retoFrac: 0.5 }),
    ]);

    const fontsLocal = fonts;
    const semLayers = L.mensagemBlockLayers({
      name: "Sem_puka",
      doc,
      x: m,
      y: 170,
      w: 640,
      h: 160,
      kind: "cliente",
      label: "cliente · 23:47",
      body: "Oi, vocês têm horário amanhã de manhã?",
      fonts: fontsLocal,
    });

    const comLayers = L.mensagemBlockLayers({
      name: "Com_puka",
      doc,
      x: m,
      y: midY + 150,
      w: 640,
      h: 160,
      kind: "ia",
      label: "IA · 23:47",
      body: "Temos sim! 8h, 9h ou 10h — qual fica melhor pra você?",
      fonts: fontsLocal,
    });

    const texto = group("Texto", [
      L.textLayer({ name: "Rotulo_sem", doc, x: m, y: 90, text: "Sem Puka", font: fonts.textoBold, size: 30, color: brand.color.bastidor, uppercase: true, tracking: 1 }),
      ...semLayers,
      L.textLayer({ name: "Nota_sem", doc, x: m, y: 360, text: "resposta só às 8h02 do dia seguinte", font: fonts.mono, size: 22, color: brand.color.bastidor }),

      L.textLayer({ name: "Rotulo_com", doc, x: m, y: midY + 70, text: "Com Puka", font: fonts.textoBold, size: 30, color: brand.color.ribaltaFunda, uppercase: true, tracking: 1 }),
      ...comLayers,
      L.textLayer({ name: "Nota_com", doc, x: m, y: midY + 340, text: "respondido em 8 segundos, às 23:47", font: fonts.mono, size: 22, color: brand.color.ribaltaFunda }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo", doc, x: doc.width - m - 56, y: doc.height - m - 64, width: 56, file: brand.logo.simboloCor }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, logo, guias] });
  },
};
