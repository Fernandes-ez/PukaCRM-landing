"use strict";

const path = require("path");
const sharp = require("sharp");
const { Canvas, loadImage, Path2D } = require("skia-canvas");

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function newCanvas(w, h) {
  return new Canvas(w, h);
}

/** Extrai o ImageData RGBA de um canvas inteiro, no formato que o ag-psd espera em `imageData`. */
function fullImageData(canvas) {
  const ctx = canvas.getContext("2d");
  const d = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return { width: canvas.width, height: canvas.height, data: d.data };
}

// Texto com tracking manual (letter-spacing) — usado só em rótulos curtos
// (eyebrow, "IA · 23:47"). A camada de texto viva do PSD não reproduz esse
// tracking (ag-psd/Photoshop tratam isso por StyleRun, fora de escopo
// aqui) — só o bitmap de preview fica com o espaçamento certo.
// ponytail: tracking só no bitmap, não no engine data. Upgrade: StyleRun
// com Tracking por caractere se precisar de fidelidade 1:1 no Photoshop.
function measureTracked(ctx, text, tracking) {
  if (!tracking) return ctx.measureText(text).width;
  let w = 0;
  for (const ch of text) w += ctx.measureText(ch).width + tracking;
  return w - tracking;
}

function fillTextTracked(ctx, text, x, y, tracking) {
  if (!tracking) {
    ctx.fillText(text, x, y);
    return;
  }
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + tracking;
  }
}

/** Quebra `text` em linhas que cabem em `maxWidth`, respeitando \n explícitos. */
function wrapText(ctx, text, maxWidth) {
  const out = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(" ");
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        out.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

const svgCache = new Map();

/** Rasteriza um SVG (caminho relativo à raiz do projeto) em PNG buffer, em cache por (arquivo,largura). */
async function rasterizeSvg(relPath, { width } = {}) {
  const key = `${relPath}@${width || "orig"}`;
  if (svgCache.has(key)) return svgCache.get(key);
  const abs = path.isAbsolute(relPath) ? relPath : path.join(__dirname, "..", relPath);
  let img = sharp(abs, { density: 300 });
  if (width) img = img.resize({ width: Math.round(width) });
  const buf = await img.png().toBuffer();
  svgCache.set(key, buf);
  return buf;
}

/** Carrega um SVG da marca já como Image do skia-canvas, pronta pra drawImage. */
async function loadSvgAsImage(relPath, opts) {
  const buf = await rasterizeSvg(relPath, opts);
  return loadImage(buf);
}

module.exports = {
  hexToRgb,
  newCanvas,
  fullImageData,
  measureTracked,
  fillTextTracked,
  wrapText,
  rasterizeSvg,
  loadSvgAsImage,
  Path2D,
};
