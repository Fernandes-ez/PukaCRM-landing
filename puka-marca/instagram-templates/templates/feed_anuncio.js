"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED, eyebrow } = require("./_shared");

module.exports = {
  slug: "feed_anuncio_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: false };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Roteiro", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.roteiro }),
    ]);

    const grafismos = group("Grafismos", [
      // deixa pequena (até ~120px, regra de escala por salto), sangrando pela borda direita
      await L.deixaLayer({ name: "Deixa", doc, x: doc.width - 150, y: m, height: 118, color: brand.color.ribalta }),
    ]);

    const texto = group("Texto", [
      ...eyebrow({ L, doc, x: m, y: m + 40, label: "Puka CRM", color: brand.color.ribaltaFunda }),
      L.textLayer({
        name: "Titulo",
        doc,
        x: m,
        y: m + 150,
        text: "A IA puxa a\nconversa. Você\nfecha a venda.",
        font: fonts.display,
        size: 108,
        color: brand.color.coxia,
        lineHeight: 112,
      }),
      L.textLayer({
        name: "Apoio",
        doc,
        x: m,
        y: m + 620,
        text: "Ninguém sem resposta. Ninguém repetindo pergunta — a IA atende, seu time entra na deixa.",
        font: fonts.texto,
        size: 34,
        color: brand.color.bastidor,
        maxWidth: 720,
        lineHeight: 44,
      }),
      ...L.ctaLayers({ name: "CTA", doc, x: m, y: m + 800, w: 340, h: 92, label: "Testa grátis", fonts }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo", doc, x: doc.width - m - 64, y: doc.height - m - 64, width: 64, file: brand.logo.simboloCor }),
    ]);

    const guias = group(
      "Guias",
      [L.guidesLayer({ name: "Margem_grade", doc, margin: m })],
      false
    );

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, logo, guias] });
  },
};
