"use strict";

const path = require("path");
const { registerAll } = require("./lib/fonts");
const { writeAndPreview } = require("./lib/psd");

registerAll();

const TEMPLATES = [
  require("./templates/feed_anuncio"),
  require("./templates/feed_dica"),
  require("./templates/carrossel_capa"),
  require("./templates/carrossel_miolo"),
  require("./templates/carrossel_final"),
  require("./templates/feed_depoimento"),
  require("./templates/feed_antes_depois"),
  require("./templates/story"),
];

async function main() {
  const outDir = path.join(__dirname, "output");
  for (const tpl of TEMPLATES) {
    process.stdout.write(`gerando ${tpl.slug}... `);
    const doc = await tpl.build();
    const result = await writeAndPreview(doc, outDir, tpl.slug);
    console.log(`ok (${(result.bytes / 1024).toFixed(0)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
