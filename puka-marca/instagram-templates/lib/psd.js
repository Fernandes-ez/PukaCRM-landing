"use strict";

const fs = require("fs");
const path = require("path");
const { writePsdBuffer } = require("ag-psd");
const { Canvas, ImageData } = require("skia-canvas");

function group(name, children, opened = true) {
  return { name, opened, children };
}

function buildDoc({ width, height, groups }) {
  return { width, height, children: groups };
}

/** Percorre a árvore de camadas em ordem de topo-pra-baixo (como o PSD guarda: último = mais no topo). */
function flattenVisible(children) {
  const out = [];
  for (const layer of children) {
    if (layer.hidden) continue;
    if (layer.children) out.push(...flattenVisible(layer.children));
    else out.push(layer);
  }
  return out;
}

function compositePreview(doc) {
  const master = new Canvas(doc.width, doc.height);
  const mctx = master.getContext("2d");
  const layers = flattenVisible(doc.children);
  for (const layer of layers) {
    if (!layer.imageData) continue;
    const { width, height, data } = layer.imageData;
    // putImageData substitui pixel sem alpha-blend — por isso vai num
    // canvas isolado (vazio, sem conflito) e só depois entra no master
    // via drawImage, que já faz o blend certo camada sobre camada.
    const tmp = new Canvas(width, height);
    const tctx = tmp.getContext("2d");
    tctx.putImageData(new ImageData(data, width, height), 0, 0);
    mctx.drawImage(tmp, 0, 0);
  }
  return master;
}

async function writeAndPreview(doc, outDir, slug) {
  fs.mkdirSync(outDir, { recursive: true });

  const buffer = writePsdBuffer(doc, { noBackground: true });
  const psdPath = path.join(outDir, `${slug}.psd`);
  fs.writeFileSync(psdPath, buffer);

  const preview = compositePreview(doc);
  const previewPath = path.join(outDir, `${slug}_preview.png`);
  await preview.toFile(previewPath);

  return { psdPath, previewPath, bytes: buffer.length };
}

module.exports = { group, buildDoc, writeAndPreview };
