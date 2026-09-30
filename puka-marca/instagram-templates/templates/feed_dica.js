"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED, eyebrow } = require("./_shared");

module.exports = {
  slug: "feed_dica_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: true };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Coxia", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.coxia }),
    ]);

    const grafismos = group("Grafismos", [
      L.hasteLayer({ name: "Haste_numero", doc, x: m, y: m + 210, h: 130, color: brand.color.roteiro, w: 10 }),
      await L.iconLayer({ name: "Icone_conversa", doc, x: doc.width - m - 150, y: m, size: 150, icon: "conversa", color: brand.color.ribaltaAcesa }),
    ]);

    const texto = group("Texto", [
      ...eyebrow({ L, doc, x: m, y: m, label: "Dica rápida", color: brand.color.ribaltaAcesa }),
      L.textLayer({ name: "Numero", doc, x: m + 34, y: m + 190, text: "01", font: fonts.display, size: 130, color: brand.color.roteiro }),
      L.textLayer({
        name: "Titulo",
        doc,
        x: m,
        y: m + 420,
        text: "Responde rápido\nnão é sorte.",
        font: fonts.display,
        size: 82,
        color: brand.color.roteiro,
        lineHeight: 90,
      }),
      L.textLayer({
        name: "Corpo",
        doc,
        x: m,
        y: m + 640,
        text: "É a IA olhando o WhatsApp 24h. Enquanto isso seu time cuida de quem já tá quase fechando.",
        font: fonts.texto,
        size: 34,
        color: brand.color.pontoClaro,
        maxWidth: 760,
        lineHeight: 46,
      }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo_negativo", doc, x: doc.width - m - 64, y: doc.height - m - 64, width: 64, file: brand.logo.simboloNegativo }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, logo, guias] });
  },
};
