"use strict";

const fs = require("fs");
const path = require("path");
const brand = require("../brand.config");
const {
  hexToRgb,
  newCanvas,
  fullImageData,
  measureTracked,
  fillTextTracked,
  wrapText,
  rasterizeSvg,
  loadSvgAsImage,
} = require("./render");

// ---------------------------------------------------------------------
// Retângulo sólido — usado direto pra "Haste" (é literalmente isso: uma
// barra reta, corte seco, sem raio — regra do sistema gráfico).
// ---------------------------------------------------------------------
function rectLayer({ name, doc, x, y, w, h, color, alpha = 1 }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };
}

const hasteLayer = ({ name, doc, x, y, h, color, w = brand.system.hasteWidthFeed }) =>
  rectLayer({ name, doc, x, y, w, h, color });

// ---------------------------------------------------------------------
// Texto — camada editável (text engine data) + bitmap de preview
// renderizado com a fonte real, pro arquivo abrir certo antes do
// Photoshop atualizar a camada (ver README do ag-psd, "Writing text
// layers").
// ---------------------------------------------------------------------
function textLayer({
  name,
  doc,
  x,
  y,
  text,
  font,
  size,
  color,
  align = "left",
  tracking = 0,
  uppercase = false,
  maxWidth,
  lineHeight,
}) {
  const str = uppercase ? text.toUpperCase() : text;
  const lh = lineHeight || Math.round(size * 1.15);

  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "alphabetic";
  ctx.font = `${size}px "${font.family}"`;
  ctx.fillStyle = color;

  const lines = maxWidth ? wrapText(ctx, str, maxWidth) : str.split("\n");

  lines.forEach((line, i) => {
    const ly = y + size + i * lh;
    const w = measureTracked(ctx, line, tracking);
    let lx = x;
    if (align === "center") lx = x + (maxWidth || 0) / 2 - w / 2;
    else if (align === "right") lx = x + (maxWidth || 0) - w;
    fillTextTracked(ctx, line, lx, ly, tracking);
  });

  return {
    name,
    top: 0,
    left: 0,
    right: doc.width,
    bottom: doc.height,
    imageData: fullImageData(canvas),
    text: {
      text: lines.join("\n"),
      transform: [1, 0, 0, 1, x, y + size],
      style: {
        font: { name: font.postscriptName },
        fontSize: size,
        fillColor: hexToRgb(color),
        tracking: tracking ? Math.round(tracking * 20) : undefined, // aproximação: 1/1000 em, ver nota no render.js
      },
      paragraphStyle: { justification: align },
    },
  };
}

// ---------------------------------------------------------------------
// Deixa — a curva do braço do k, tirada de puka-simbolo-cor.svg. Sempre
// via SVG+sharp (mesmo caminho comprovado do logo/ícones), nunca redesenhada
// à mão em Path2D — uma curva bézier só existe em um lugar no projeto:
// brand.config.js.
// ---------------------------------------------------------------------
function deixaSvgString(color) {
  const { deixaPath } = brand.simbolo;
  // viewBox recortado só na bbox do braço (x 221-512, y 0-527 no espaço
  // local já invertido pelo scale(1 -1), igual ao símbolo original).
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="221 -527 291 527"><g transform="scale(1 -1)"><path fill="${color}" d="${deixaPath}"/></g></svg>`;
}

async function deixaLayer({ name, doc, x, y, height, color, flipX = false }) {
  const width = Math.round((height * 291) / 527);
  const svg = deixaSvgString(color);
  const buf = await require("sharp")(Buffer.from(svg), { density: 300 }).resize({ height }).png().toBuffer();
  const img = await require("skia-canvas").loadImage(buf);

  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.save();
  if (flipX) {
    ctx.translate(x + width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, width, height);
  } else {
    ctx.drawImage(img, x, y, width, height);
  }
  ctx.restore();
  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas), width };
}

// ---------------------------------------------------------------------
// Linha de passagem — reta em Ponto, lacuna, curva à mão em Ribalta.
// Desenhada direto (não vem de SVG da marca — é um padrão procedural,
// só precisa do comprimento).
// ---------------------------------------------------------------------
function linhaPassagemLayer({ name, doc, x, y, width, retoFrac = 0.32, dark = false }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  const retoW = width * retoFrac;
  const lacuna = brand.system.hasteWidthFeed;

  ctx.strokeStyle = dark ? brand.color.pontoClaro : brand.color.ponto;
  ctx.lineWidth = 4;
  ctx.lineCap = "butt";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + retoW, y);
  ctx.stroke();

  const curveStart = x + retoW + lacuna;
  const curveW = width - retoW - lacuna;
  ctx.strokeStyle = dark ? brand.color.ribaltaAcesa : brand.color.ribaltaFunda;
  ctx.lineWidth = 5.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(curveStart, y);
  ctx.bezierCurveTo(
    curveStart + curveW * 0.22, y - 8,
    curveStart + curveW * 0.42, y + 8,
    curveStart + curveW * 0.62, y - 4
  );
  ctx.bezierCurveTo(
    curveStart + curveW * 0.76, y - 10,
    curveStart + curveW * 0.9, y + 2,
    curveStart + curveW, y
  );
  ctx.stroke();

  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };
}

// ---------------------------------------------------------------------
// Bloco de mensagem — cliente (Papel + borda 2px Linha), IA (borda
// esquerda 8px Ponto), humano (borda esquerda 8px Ribalta). Nada de
// balão arredondado estilo WhatsApp (regra do manual, seção 08).
// Devolve um array de camadas (fundo + rótulo mono opcional + corpo).
// ---------------------------------------------------------------------
function mensagemBlockLayers({ name, doc, x, y, w, h, kind, label, body, fonts }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");

  if (kind === "cliente") {
    ctx.fillStyle = brand.color.papel;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = brand.color.linha;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  } else {
    ctx.fillStyle = doc.dark ? "#241f2c" : brand.color.rotunda;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = kind === "ia" ? (doc.dark ? brand.color.pontoClaro : brand.color.ponto) : (doc.dark ? brand.color.ribaltaAcesa : brand.color.ribaltaFunda);
    ctx.fillRect(x, y, 8, h);
  }

  const bgLayer = { name: `${name}_fundo`, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };

  const pad = 24;
  const layers = [bgLayer];

  if (label) {
    layers.push(
      textLayer({
        name: `${name}_rotulo`,
        doc,
        x: x + pad,
        y: y + 14,
        text: label,
        font: fonts.mono,
        size: 20,
        color: kind === "cliente" ? brand.color.bastidor : kind === "ia" ? (doc.dark ? brand.color.pontoClaro : brand.color.ponto) : (doc.dark ? brand.color.ribaltaAcesa : brand.color.ribaltaFunda),
      })
    );
  }

  layers.push(
    textLayer({
      name: `${name}_texto`,
      doc,
      x: x + pad,
      y: y + (label ? 44 : 20),
      text: body,
      font: fonts.texto,
      size: 26,
      color: doc.dark ? brand.color.roteiro : brand.color.coxia,
      maxWidth: w - pad * 2,
      lineHeight: 34,
    })
  );

  return layers;
}

// ---------------------------------------------------------------------
// CTA — bloco Ribalta Funda (Ribalta Acesa no escuro), texto Papel,
// raio 0.
// ---------------------------------------------------------------------
function ctaLayers({ name, doc, x, y, w, h, label, fonts }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = doc.dark ? brand.color.ribaltaAcesa : brand.color.ribaltaFunda;
  ctx.fillRect(x, y, w, h);
  const bg = { name: `${name}_fundo`, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };

  const size = 32;
  const measureCanvas = newCanvas(10, 10);
  const mctx = measureCanvas.getContext("2d");
  mctx.font = `${size}px "${fonts.textoBold.family}"`;
  const textW = mctx.measureText(label.toUpperCase()).width;

  const txt = textLayer({
    name: `${name}_texto`,
    doc,
    x: x + w / 2 - textW / 2,
    y: y + h / 2 - size / 2,
    text: label,
    font: fonts.textoBold,
    size,
    color: doc.dark ? brand.color.coxia : brand.color.papel,
    uppercase: true,
  });

  return [bg, txt];
}

// ---------------------------------------------------------------------
// Logo e ícones — sempre via SVG oficial rasterizado, nunca redigitado.
// ---------------------------------------------------------------------
async function logoLayer({ name, doc, x, y, width, file }) {
  const img = await loadSvgAsImage(file, { width: width * 2 });
  const h = (img.height / img.width) * width;
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, x, y, width, h);
  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas), height: h };
}

async function iconLayer({ name, doc, x, y, size, icon, color }) {
  const relFile = path.join(brand.icon.dir, brand.icon.files[icon]);
  const abs = path.join(__dirname, "..", relFile);
  let svg = fs.readFileSync(abs, "utf8");
  svg = svg.replace(/stroke="#1E1B24"/i, `stroke="${color}"`);
  const buf = await require("sharp")(Buffer.from(svg), { density: 300 }).resize({ width: size * 2 }).png().toBuffer();
  const img = await require("skia-canvas").loadImage(buf);
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, x, y, size, size);
  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };
}

// ---------------------------------------------------------------------
// Placeholder de foto. Só duas formas de máscara, regra do manual:
// "haste" (retângulo vertical estreito, sangrando em cima/embaixo) e
// "corte-da-deixa" (uma borda segue a curva, via clip evenodd
// combinando o retângulo com o path da deixa num Path2D só).
// ---------------------------------------------------------------------
function fotoPlaceholderLayer({ name, doc, x, y, w, h, shape = "haste", color }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  const fill = color || brand.color.rotunda;

  if (shape === "haste") {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
  } else {
    // corte-da-deixa: retângulo com uma mordida no formato do braço do k
    // na borda direita, via Path2D evenodd (rect + deixa escalada pro
    // mesmo espaço, ambas no mesmo path -> a interseção vira "buraco").
    const { Path2D } = require("./render");
    const p = new Path2D();
    p.rect(x, y, w, h);
    const s = h / 527;
    const dW = 291 * s;
    p.moveTo(x + w - dW * 0.24, y);
    // aproxima o braço do k como recorte na borda direita, mesma
    // proporção do path oficial, escalado pra altura h.
    p.bezierCurveTo(
      x + w - dW * 0.42, y + h * 0.28,
      x + w - dW, y + h * 0.44,
      x + w - dW, y + h * 0.5
    );
    p.bezierCurveTo(
      x + w - dW, y + h * 0.6,
      x + w - dW * 0.62, y + h * 0.76,
      x + w - dW * 0.1, y + h
    );
    p.lineTo(x + w, y + h);
    p.lineTo(x + w, y);
    p.closePath();

    ctx.fillStyle = fill;
    ctx.fill(p, "evenodd");
  }

  return {
    name,
    top: 0,
    left: 0,
    right: doc.width,
    bottom: doc.height,
    imageData: fullImageData(canvas),
  };
}

// ---------------------------------------------------------------------
// Padrão de fundo (seção 08 do manual) — no máximo um uso por peça,
// já pronto como SVG oficial.
// ---------------------------------------------------------------------
async function padraoLayer({ name, doc, dark = false }) {
  const file = dark ? brand.padrao.escuro : brand.padrao.claro;
  const img = await loadSvgAsImage(file, { width: doc.width });
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  const h = (img.height / img.width) * doc.width;
  // ladrilha verticalmente se a altura do doc for maior que uma faixa do padrão
  for (let ty = 0; ty < doc.height; ty += h) {
    ctx.drawImage(img, 0, ty, doc.width, h);
  }
  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas) };
}

// ---------------------------------------------------------------------
// Guias — margem de segurança + grade de 12 colunas, sempre oculta
// (hidden: true), só de referência.
// ---------------------------------------------------------------------
function guidesLayer({ name, doc, margin, safeTop, safeBottom }) {
  const canvas = newCanvas(doc.width, doc.height);
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#00AEEF";
  ctx.lineWidth = 1;

  if (margin) {
    ctx.strokeRect(margin, margin, doc.width - margin * 2, doc.height - margin * 2);
    const cols = 12;
    const gutter = (doc.width - margin * 2) / cols;
    for (let i = 1; i < cols; i++) {
      const gx = margin + gutter * i;
      ctx.beginPath();
      ctx.moveTo(gx, margin);
      ctx.lineTo(gx, doc.height - margin);
      ctx.stroke();
    }
  }

  if (safeTop) {
    ctx.strokeStyle = "#FF00AE";
    ctx.beginPath();
    ctx.moveTo(0, safeTop);
    ctx.lineTo(doc.width, safeTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, doc.height - safeBottom);
    ctx.lineTo(doc.width, doc.height - safeBottom);
    ctx.stroke();
  }

  return { name, top: 0, left: 0, right: doc.width, bottom: doc.height, imageData: fullImageData(canvas), hidden: true };
}

module.exports = {
  rectLayer,
  hasteLayer,
  textLayer,
  deixaLayer,
  linhaPassagemLayer,
  mensagemBlockLayers,
  ctaLayers,
  logoLayer,
  iconLayer,
  fotoPlaceholderLayer,
  padraoLayer,
  guidesLayer,
};
