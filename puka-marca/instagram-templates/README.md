# Templates de Instagram — Puka CRM ("A Deixa")

Gera 8 templates `.psd` (camadas separadas, texto editável) pro Instagram,
no sistema visual do rebrand "A Deixa". Fonte da verdade de marca:
`../puka-manual.html` — se este projeto divergir do manual, o manual vence.

## Rodar

```bash
npm install
npm run generate
```

Gera em `output/`: um `.psd` por template + um `<nome>_preview.png` pra
conferir sem abrir o Photoshop.

## Trocar cores ou fontes

Tudo (hex das cores, arquivo/peso/nome de cada fonte) vive em
`brand.config.js` — nenhum outro arquivo do projeto tem cor ou fonte "hard
coded". Mude ali e rode `npm run generate` de novo.

Pra trocar uma fonte por outro arquivo `.ttf`: aponte `font.*.file` pro
novo arquivo e atualize `postscriptName` (precisa bater com o nome
PostScript real do arquivo, senão o Photoshop não acha a fonte ao abrir o
`.psd`). Pra descobrir o nome PostScript de um `.ttf` novo:

```bash
node -e "console.log(require('fontkit').openSync('caminho/da/fonte.ttf').postscriptName)"
```

## O que cada template é

| Arquivo | Tamanho | O quê |
|---|---|---|
| `feed_anuncio_1080x1350` | 1080×1350 | Post único: título forte + apoio + CTA |
| `feed_dica_1080x1350` | 1080×1350 | Dica rápida numerada, fundo escuro |
| `carrossel_capa_1080x1350` | 1080×1350 | Capa de carrossel, deixa gigante sangrando na borda |
| `carrossel_miolo_1080x1350` | 1080×1350 | Slide de conteúdo do carrossel |
| `carrossel_final_1080x1350` | 1080×1350 | Slide final: logo + CTA |
| `feed_depoimento_1080x1350` | 1080×1350 | Citação de cliente + foto placeholder |
| `feed_antes_depois_1080x1350` | 1080×1350 | "Sem Puka / Com Puka", linha de passagem dividindo |
| `story_1080x1920` | 1080×1920 | Story, com faixas de 250px livres em cima/embaixo |

Todos com copy de exemplo já preenchida (trocável — são camadas de texto
editáveis de verdade, não bitmap).

## Estrutura de camadas

Todo `.psd` segue os mesmos 6 grupos, nessa ordem (de baixo pra cima):
`Fundo` → `Grafismos` → `Imagem (substituir)` → `Texto` → `Logo` → `Guias`
(`Guias` sempre oculto — é só a margem de segurança/grade de 12 colunas
de referência).

`Imagem (substituir)` tem uma forma `FOTO_AQUI` já com a máscara certa
(haste ou corte-da-deixa, cor de placeholder Papel/Rotunda) — troque o
conteúdo por uma foto de verdade via clipping mask no Photoshop.

## Como o pipeline funciona (pra quem for mexer no código)

- **`skia-canvas`**, não `node-canvas`: `node-canvas` tem um bug conhecido
  no Windows onde `registerFont()` de fonte customizada falha
  silenciosamente e cai pro Sans do sistema. `skia-canvas` usa o font
  manager do próprio Skia e funciona igual em qualquer SO — testado e
  confirmado nesta máquina antes de escrever o resto do pipeline.
- Toda camada (texto, haste, deixa, ícone, bloco de mensagem, CTA...) é
  desenhada num canvas do tamanho inteiro do documento e vira
  `imageData` (RGBA cru) direto no objeto de camada do `ag-psd` — sem
  passar pelo `initializeCanvas`/backend de canvas do `ag-psd`, que só é
  necessário pra **ler** `.psd` de volta, não pra escrever.
- Camadas de texto levam **as duas coisas**: o bloco `text` (engine data
  editável, com fonte/tamanho/cor/transform) **e** um `imageData`
  já renderizado com a fonte real — sem isso o Photoshop abre pedindo
  "Update Text Layer" antes de mostrar o texto certo (ver seção "Writing
  text layers" do README do `ag-psd`).
- `lib/psd.js` também gera o `preview.png` de cada template, compondo as
  camadas manualmente (mesmo motivo acima: não dá pra pedir o composite
  pronto do `ag-psd` sem o backend de canvas).

### Simplificações deliberadas (documentadas, não escondidas)

- **`Grafismos`/`Haste`/`Deixa`/placeholder de foto são raster, não
  vetor vivo do Photoshop.** O `ag-psd` até modela `vectorMask`/
  `vectorFill` no tipo `Layer`, mas o formato não é documentado no
  README da lib nem testado por ela publicamente — o risco de gerar um
  `.psd` com máscara vetorial corrompida (a própria lib avisa que layer
  vertical já quebrou o Photoshop antes) pesou mais que o ganho. Camada
  nomeada certo + silhueta correta cobre o uso real (redimensionar
  trocando o valor em `brand.config.js`/no template e regerando é mais
  simples que editar path no Photoshop mesmo). Upgrade: implementar
  `vectorMask` de verdade se precisar editar a forma direto no
  Photoshop.
- **Fonte Bricolage Grotesque no eixo óptico default, não opsz=96.**
  O briefing original pedia instanciar opsz=96 via `fonttools
  varLib.instancer` se só a variável existisse — mas este ambiente não
  tem Python instalado, e o Google Fonts já publica estáticos
  Bold/ExtraBold prontos (é só o eixo óptico que fica no valor default
  do arquivo, não travado em 96). Diferença visual é sutil em título
  grande. Upgrade: instalar `fonttools` e instanciar
  `BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf` se isso incomodar
  de perto.
- **Tracking (letter-spacing) só no bitmap de preview, não no engine
  data do texto vivo.** `ag-psd` aceita um campo `tracking` no estilo do
  texto, mas é global por *style run*, em unidades de 1/1000 em — a
  conversão exata a partir de um valor em pixels do canvas é
  aproximada. Rótulos curtos em caixa alta (eyebrow, timestamps mono)
  são os únicos afetados; o resto do texto não usa tracking.
