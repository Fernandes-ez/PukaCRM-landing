"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED } = require("./_shared");

module.exports = {
  slug: "feed_depoimento_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: false };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Rotunda", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.rotunda }),
    ]);

    const grafismos = group("Grafismos", [
      L.hasteLayer({ name: "Haste_abertura", doc, x: m, y: m + 40, h: 220, color: brand.color.coxia }),
    ]);

    // foto pequena do cliente, máscara "haste" (retângulo estreito
    // sangrando pela borda inferior) — pra trocar via clip mask. Cor
    // Papel, não Rotunda: precisa destoar do fundo pra aparecer como
    // placeholder (achado gerando o preview — Rotunda sobre Rotunda
    // ficava invisível).
    const imagem = group("Imagem (substituir)", [
      L.fotoPlaceholderLayer({ name: "FOTO_AQUI", doc, x: m, y: doc.height - 330, w: 150, h: 330 + m, shape: "haste", color: brand.color.papel }),
    ]);

    const texto = group("Texto", [
      L.textLayer({
        name: "Citacao",
        doc,
        x: m,
        y: m + 320,
        text: "Antes eu perdia\nmatrícula porque\nninguém respondia\nà noite. Agora nem\npercebo — a IA já\nresolveu.",
        font: fonts.displayBold,
        size: 64,
        color: brand.color.coxia,
        lineHeight: 72,
      }),
      L.textLayer({ name: "Nome", doc, x: m + 200, y: doc.height - 260, text: "Marina Alves", font: fonts.textoBold, size: 30, color: brand.color.coxia }),
      L.textLayer({ name: "Negocio", doc, x: m + 200, y: doc.height - 214, text: "Studio Vitalize · academia", font: fonts.mono, size: 22, color: brand.color.bastidor }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo", doc, x: doc.width - m - 56, y: m + 40, width: 56, file: brand.logo.simboloCor }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, imagem, texto, logo, guias] });
  },
};
