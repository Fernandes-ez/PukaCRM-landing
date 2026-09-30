"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED } = require("./_shared");

module.exports = {
  slug: "carrossel_capa_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: false };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Roteiro", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.roteiro }),
    ]);

    // deixa gigante (mais da metade da peça) sangrando pela borda direita —
    // escala por salto, regra 05 do sistema gráfico.
    const grafismos = group("Grafismos", [
      await L.deixaLayer({ name: "Deixa_gigante", doc, x: doc.width - 430, y: -40, height: doc.height * 0.62, color: brand.color.ribalta }),
    ]);

    const texto = group("Texto", [
      L.textLayer({ name: "Contador", doc, x: m, y: m, text: "1/3", font: fonts.mono, size: 24, color: brand.color.bastidor }),
      L.textLayer({
        name: "Titulo_gancho",
        doc,
        x: m,
        y: doc.height * 0.42,
        text: "3 sinais de que\nvocê tá perdendo\nlead no WhatsApp",
        font: fonts.display,
        size: 92,
        color: brand.color.coxia,
        maxWidth: 620,
        lineHeight: 98,
      }),
      L.textLayer({ name: "Apoio", doc, x: m, y: doc.height - m - 60, text: "desliza →", font: fonts.mono, size: 26, color: brand.color.ribaltaFunda, tracking: 1 }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo", doc, x: doc.width - m - 56, y: doc.height - m - 64, width: 56, file: brand.logo.simboloCor }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, logo, guias] });
  },
};
