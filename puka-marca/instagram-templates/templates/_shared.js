"use strict";

const brand = require("../brand.config");

const fonts = {
  display: brand.font.display.extraBold,
  displayBold: brand.font.display.bold,
  texto: brand.font.texto.regular,
  textoBold: brand.font.texto.bold,
  mono: brand.font.mono.regular,
  monoMedium: brand.font.mono.medium,
};

const FEED = { width: brand.canvas.feed.width, height: brand.canvas.feed.height, margin: brand.canvas.feed.margin };
const STORY = { width: brand.canvas.story.width, height: brand.canvas.story.height, safeZone: brand.canvas.story.safeZone };

/** Eyebrow padrão: haste fininha + rótulo mono tracked em caixa alta. */
function eyebrow({ L, doc, x, y, label, color }) {
  return [
    { ...L.hasteLayer({ name: "eyebrow_haste", doc, x, y: y + 2, h: 22, color, w: 5 }) },
    L.textLayer({ name: "eyebrow_texto", doc, x: x + 16, y, text: label, font: fonts.monoMedium, size: 22, color, tracking: 2, uppercase: true }),
  ];
}

module.exports = { fonts, FEED, STORY, eyebrow };
