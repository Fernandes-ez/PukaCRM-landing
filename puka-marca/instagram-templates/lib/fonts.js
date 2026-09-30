"use strict";

const path = require("path");
const { FontLibrary } = require("skia-canvas");
const brand = require("../brand.config");

// node-canvas quebra registerFont() de fonte customizada no Windows
// (cai pra Sans sem avisar) — ver README do projeto. skia-canvas usa o
// próprio font manager do Skia e funciona igual em qualquer SO.
let registered = false;

function registerAll() {
  if (registered) return;
  const all = [
    ...Object.values(brand.font.display),
    ...Object.values(brand.font.texto),
    ...Object.values(brand.font.mono),
  ];
  for (const f of all) {
    FontLibrary.use(f.family, [path.join(__dirname, "..", f.file)]);
  }
  registered = true;
}

module.exports = { registerAll };
