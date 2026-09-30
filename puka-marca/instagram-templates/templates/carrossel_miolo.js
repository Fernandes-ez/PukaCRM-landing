"use strict";

const brand = require("../brand.config");
const L = require("../lib/layers");
const { group, buildDoc } = require("../lib/psd");
const { fonts, FEED } = require("./_shared");

module.exports = {
  slug: "carrossel_miolo_1080x1350",
  async build() {
    const doc = { width: FEED.width, height: FEED.height, dark: false };
    const m = FEED.margin;

    const fundo = group("Fundo", [
      L.rectLayer({ name: "Papel", doc, x: 0, y: 0, w: doc.width, h: doc.height, color: brand.color.papel }),
    ]);

    const grafismos = group("Grafismos", [
      L.hasteLayer({ name: "Haste_topo", doc, x: m, y: m, h: 90, color: brand.color.ponto }),
    ]);

    const icone = await L.iconLayer({ name: "Icone", doc, x: m + 30, y: m + 130, size: 56, icon: "lead", color: brand.color.ribaltaFunda });

    const texto = group("Texto", [
      L.textLayer({ name: "Contador", doc, x: doc.width - m - 60, y: m, text: "2/3", font: fonts.mono, size: 24, color: brand.color.bastidor }),
      icone,
      L.textLayer({
        name: "Titulo",
        doc,
        x: m,
        y: m + 240,
        text: "Sinal 1: o cliente\nmanda mensagem\nàs 23h",
        font: fonts.display,
        size: 66,
        color: brand.color.coxia,
        maxWidth: 820,
        lineHeight: 72,
      }),
      L.textLayer({
        name: "Corpo",
        doc,
        x: m,
        y: m + 500,
        text: "E só vê a resposta do seu time às 9h do dia seguinte. Até lá, ele já mandou a mesma pergunta pra três concorrentes.",
        font: fonts.texto,
        size: 34,
        color: brand.color.bastidor,
        maxWidth: 780,
        lineHeight: 46,
      }),
      L.textLayer({
        name: "Rotulo_dado",
        doc,
        x: m,
        y: doc.height - m - 60,
        text: "23:47 · sem resposta",
        font: fonts.mono,
        size: 24,
        color: brand.color.ribaltaFunda,
      }),
    ]);

    const guias = group("Guias", [L.guidesLayer({ name: "Margem_grade", doc, margin: m })], false);

    return buildDoc({ width: doc.width, height: doc.height, groups: [fundo, grafismos, group("Imagem (substituir)", []), texto, group("Logo", []), guias] });
  },
};
