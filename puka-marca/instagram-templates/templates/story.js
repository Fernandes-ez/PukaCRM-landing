"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, STORY, eyebrow } = require("./_shared");

module.exports = {
  slug: "story_1080x1920",
  async build() {
    const doc = { width: STORY.width, height: STORY.height, dark: true };
    const safe = STORY.safeZone;
    const m = 80;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Coxia", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.coxia }),
    ]);

    const grafismos = group("Grafismos", [
      // deixa gigante centralizada na área livre central — únicas duas
      // faixas de 250px em cima/embaixo (avatar do story, ações) ficam
      // limpas, regra do briefing.
      await L.deixaLayer({ name: "Deixa", doc, x: doc.width / 2 - 100, y: safe + 60, height: 220, color: brand.color.ribaltaAcesa }),
      // preenche o vão entre o apoio e o logo com a linha de passagem —
      // reforça a marca em vez de deixar negativo espaço sem função.
      L.linhaPassagemLayer({ name: "Linha_passagem", doc, x: m, y: safe + 900, width: doc.width - m * 2, dark: true }),
    ]);

    const texto = group("Texto", [
      ...eyebrow({ L, doc, x: m, y: safe + 340, label: "Puka CRM", color: brand.color.ribaltaAcesa }),
      L.textLayer({
        name: "Titulo",
        doc,
        x: m,
        y: safe + 420,
        text: "Seu WhatsApp\nnunca mais\nfica esperando.",
        font: fonts.display,
        size: 78,
        color: brand.color.roteiro,
        maxWidth: 920,
        lineHeight: 86,
      }),
      L.textLayer({
        name: "Apoio",
        doc,
        x: m,
        y: safe + 720,
        text: "Arrasta pra cima e testa grátis.",
        font: fonts.texto,
        size: 32,
        color: brand.color.pontoClaro,
        maxWidth: 800,
      }),
    ]);

    const logo = group("Logo", [
      await L.logoLayer({ name: "Puka_simbolo_negativo", doc, x: doc.width / 2 - 40, y: doc.height - safe - 130, width: 80, file: brand.logo.simboloNegativo }),
    ]);

    const guias = group(
      "Guias",
      [L.guidesLayer({ name: "Safe_zone", doc, safeTop: safe, safeBottom: safe })],
      false
    );

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, logo, guias] });
  },
};
