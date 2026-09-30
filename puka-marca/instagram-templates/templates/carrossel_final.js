"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED } = require("./_shared");

module.exports = {
  slug: "carrossel_final_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: true };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Coxia", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.coxia }),
    ]);

    const grafismos = group("Grafismos", [
      await L.deixaLayer({ name: "Deixa", doc, x: doc.width / 2 - 90, y: doc.height * 0.16, height: 190, color: brand.color.ribaltaAcesa }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_principal_negativo", doc, x: doc.width / 2 - 130, y: doc.height * 0.42, width: 260, file: brand.logo.principalNegativo }),
    ]);

    const texto = group("Texto", [
      L.textLayer({ name: "Contador", doc, x: doc.width - m - 60, y: m, text: "3/3", font: fonts.mono, size: 24, color: brand.color.bastidor }),
      L.textLayer({
        name: "Titulo",
        doc,
        x: 0,
        y: doc.height * 0.56,
        text: "A IA dá a deixa.",
        font: fonts.display,
        size: 58,
        color: brand.color.roteiro,
        align: "center",
        maxWidth: doc.width,
      }),
      ...L.ctaLayers({ name: "CTA", doc, x: doc.width / 2 - 160, y: doc.height * 0.68, w: 320, h: 92, label: "Link na bio", fonts }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), logo, texto, guias] });
  },
};
