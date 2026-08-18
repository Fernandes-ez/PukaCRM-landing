# CRM Platform — Landing Page / Site de Marketing

Site público de marketing e contratação da plataforma (SaaS multi-tenant
de atendimento via WhatsApp com IA + CRM, foco em pequenas/médias
empresas — academias, clínicas, escolas, etc.). **Repositório separado**
do app autenticado (`crm-frontend`) e do backend (`crm-backend`,
siblings deste diretório) — decisão tomada em 2026-07-21.

## Por que repositório separado (não é o app autenticado)

- **SEO importa de verdade aqui.** O `crm-frontend` é uma SPA (Vite)
  atrás de login — SEO não importa nada lá. Aqui é o oposto: é a página
  que precisa aparecer em busca orgânica ("sistema de atendimento
  WhatsApp com IA pra academia" etc.), compartilhar bem em redes sociais
  (OG tags), e carregar rápido pra não perder conversão. SPA sem SSR/SSG
  não entrega isso.
- **Ritmo de iteração diferente**: landing page muda por campanha,
  teste A/B, novo conteúdo de marketing — não deveria estar acoplada ao
  ciclo de release do app.
- **Estrutura de domínio**: pensado originalmente como raiz do domínio
  (`suaempresa.com`) + app autenticado num subdomínio
  (`app.suaempresa.com`), mas **ainda não existe domínio próprio
  configurado** — nem este site nem o app autenticado. Cada um está
  hospedado direto na URL padrão da Vercel: este site em
  `https://puka-crm-landing.vercel.app`, o app autenticado em
  `https://puka-crm-web.vercel.app` (ver `CLAUDE.md` do `crm-frontend`,
  seção de deploy). Usar essa URL real do app como `NEXT_PUBLIC_APP_URL`
  em produção até um domínio próprio existir; times de marketing/growth
  eventualmente mexem só aqui, sem tocar no código do app.

## Stack

- **Next.js** (não Vite/CRA) — precisa de SSG/SSR pra SEO de verdade.
  React se mantém consistente com o `crm-frontend` (mesmo conhecimento,
  eventualmente componentes de UI podem ser compartilhados).
- **Tailwind CSS** — mesma escolha do `crm-frontend`, pra manter
  consistência visual entre marketing e app.
- Deploy: Vercel (integração nativa com Next.js, CDN global, preview
  deployments por PR) — já deployado em
  `https://puka-crm-landing.vercel.app`.

## O que este site faz (e o que não faz)

**Faz**: apresenta o produto, mostra os planos e preços (já definidos —
ver seção "Planos e preços" abaixo), capta cadastro de empresa nova
(chama `POST /companies` do backend — é literalmente o endpoint de
onboarding que já existe e já funciona), redireciona pro login do app
depois do cadastro.

**Não faz ainda** (não construir UI pra isso agora):
- **Cobrança/checkout de verdade.** Os 3 planos abaixo têm preço
  definido, mas **não existe gateway de pagamento integrado nem
  entidade `Subscription` no backend ainda** (decisão em aberto,
  discutida mas não fechada) — nada de formulário de cartão de crédito
  nesta fase. O CTA de cadastro, **pra qualquer plano escolhido**, é
  efetivamente "comece grátis" (`Company` nasce com `status=TRIAL`), não
  "assine agora".
- **Aplicação real dos limites de cada plano.** O backend hoje não sabe
  em qual plano uma `Company` está — não existe enforcement de "até 3
  funcionários" nem nada parecido. Os planos são só posicionamento de
  marketing/preço por enquanto, não uma trava técnica. Não construir UI
  que assuma que o backend vai bloquear alguém de passar do limite.
- **Diferenciação por plano no momento do cadastro.** Como não há
  enforcement, o formulário de `/cadastro` não precisa (ainda) perguntar
  "qual plano você quer" de um jeito que mude o payload enviado pro
  backend — é o mesmo `POST /companies` não importa o plano anunciado na
  página de preços. Pode registrar a intenção (ex: pra follow-up
  comercial), mas não é bloqueante.

## Fluxo de cadastro (mapeia direto pro backend já existente)

`POST {API_URL}/companies` (sem autenticação, endpoint público) — em
produção, `API_URL` (env var `NEXT_PUBLIC_API_URL`, lida em `lib/api.ts`,
com fallback pra `http://localhost:8000` só em dev) precisa apontar pra
`https://pukacrm.duckdns.org`, o backend real já em produção. Payload:

```json
{
  "name": "string (2-150)",
  "slug": "string (2-100, regex ^[a-z0-9-]+$, único)",
  "email": "email da empresa",
  "phone": "string (8-25)",
  "legal_name": "opcional",
  "document": "CPF ou CNPJ, com ou sem pontuação (11-20 caracteres) — OBRIGATÓRIO desde 2026-08-04",
  "owner_full_name": "string (2-150)",
  "owner_email": "email de login do dono da conta",
  "owner_password": "mínimo 8 caracteres"
}
```

⚠️ **`document` virou obrigatório em 2026-08-04** (decisão #14/nota de
2026-08-04 do `CLAUDE.MD` do backend) — o Asaas exige CPF ou CNPJ do
cliente pra criar a assinatura de verdade (`POST /subscriptions` rejeita
com 400 sem isso). Antes era opcional e só aceitava CNPJ; agora aceita
**CPF ou CNPJ** (`CompanyCreate.document`, `min_length=11,
max_length=20` no schema do backend) — importante pro texto do
formulário não dizer só "CNPJ", já que parte do público-alvo (consultório
de 1 profissional, autônomo) pode só ter CPF/MEI. Sem esse campo
preenchido, `POST /companies` responde 422.

Devolve `CompanyRead` (**sem token de acesso** — o cadastro não loga
automaticamente). Depois de um cadastro bem-sucedido, o fluxo certo é
**redirecionar pro login do app** (`loginUrl()` em `lib/api.ts`, que
monta a URL a partir de `APP_URL`/`NEXT_PUBLIC_APP_URL` — em produção
precisa ser `https://puka-crm-web.vercel.app/login`, não
`app.suaempresa.com`, que não existe ainda), idealmente com o
`owner_email` pré-preenchido), não tentar autenticar
direto — `POST /companies` e `POST /auth/login` são chamadas separadas.

⚠️ **Backend TODO antes de expor esse formulário publicamente de
verdade**: `POST /companies` hoje não tem nenhuma proteção contra abuso
(rate limit, captcha) — é um endpoint público que cria conta real no
banco. Antes do lançamento de verdade, vale pedir a adição de
rate-limiting por IP e/ou captcha (hCaptcha/Cloudflare Turnstile) no
backend. Documentado aqui pra não esquecer, não é trabalho deste repo.

## Planos e preços

**Revisado em 2026-08-14** — substitui o rascunho de 2026-07-21 (preços
antigos R$127/R$297/"a partir de R$697"). Motivo da revisão: estudo de
mercado mais completo, lendo o código real de `crm-backend`/
`crm-frontend` (não só a doc de produto) e pesquisando 9 concorrentes
diretos/adjacentes (Kommo, ChatGuru, Digisac, Umbler Talk, Zenvia, Wati,
Huggy, JivoChat, além de software vertical que o próprio público-alvo
já assina — EVO/Pacto pra academia, softwares de clínica). Achado
central: o custo variável de IA (Gemini) é praticamente zero — o preço
é ancorado em valor de mercado, não em custo de operação. **Ainda é
rascunho pra validar com clientes piloto**, mas reflete melhor o
posicionamento real do produto do que a versão anterior. IA de
atendimento entra nos três planos — é o motivo de compra, não um
upsell. Onboarding assistido também entra nos três por enquanto.

**⚠️ Evitar jargão técnico no texto da página** (ex: não escrever "RBAC")
— usar linguagem que a pessoa que está comprando reconhece: "controle de
acesso por cargo", "quem da equipe pode ver/fazer o quê".

**Puka Copilot (o assistente de IA que sugere argumento de venda pro
consultor humano, ver `CLAUDE.md` do backend, decisão #28) só aparece
no Professional e no Enterprise** — ele só existe quando uma conversa já
está com um humano, então o valor dele só é óbvio no perfil de cliente
desses dois planos; incluir no Starter diluiria o motivo de upgrade.
Nenhum concorrente pesquisado oferece isso no mesmo preço — a Wati, por
exemplo, cobra "créditos de IA Co-pilot" à parte mesmo no plano de
US$299/mês.

### Starter — R$ 197/mês (R$ 158/mês no plano anual)
- 1 número de WhatsApp (API oficial da Meta)
- Até 3 funcionários
- IA de atendimento (Assistente configurável)
- CRM completo: pipeline, tarefas e observações
- Distribuição automática de leads
- Controle de acesso por cargo
- **Sem Puka Copilot**

Pra quem: começando a organizar o atendimento — consultório de 1-2
profissionais, academia pequena.

### Professional — R$ 397/mês (R$ 318/mês no plano anual) — plano em destaque
- Tudo do Starter
- Até 10 funcionários
- **Puka Copilot** — sugestão de venda em tempo real pro consultor
- Campanhas segmentadas, com agendamento e recorrência
- Templates com botões (resposta rápida, link, telefone)
- Suporte prioritário

Pra quem: equipe de vendas de verdade, vários consultores revezando
conversa no WhatsApp — é onde a maioria dos clientes-alvo deve cair.
Destacar visualmente esse plano na página (é o "recomendado").

### Enterprise — a partir de R$ 897/mês (sob consulta)
- Tudo do Professional
- Funcionários ilimitados
- Puka Copilot incluído
- Fila de campanha prioritária, maior volume de disparo
- Onboarding assistido + gerente de conta dedicado
- Suporte com SLA

Pra quem: redes, franquias e operações de atendimento em volume. CTA
deveria ser "fale com a gente", não um cadastro self-service direto.
**Desenho comercial pendente pra redes com múltiplas unidades**: hoje a
arquitetura é 1 número de WhatsApp por `Company` — uma rede vira N
contas, então o desconto por unidade precisa refletir isso, não fingir
que é uma assinatura única maior.

**Não oferecer**: plano com múltiplos números de WhatsApp — o produto
hoje só suporta 1 número por empresa (decisão de escopo já tomada no
backend). Se isso mudar no futuro, vira diferencial real do Enterprise.

**Cobrança anual**: ~20% de desconto em todos os planos — ajuda fluxo de
caixa e reduz churn nos primeiros meses.

**Correção em 2026-08-14, achada verificando as próprias afirmações da
landing contra o código**: a versão original desta nota (e do texto da
FAQ/rodapé de Preços na página) dizia que a Puka "repassa" o custo de
mensageria da Meta "sem markup" — **isso não existe no backend**, grep
por `markup`/custo de WhatsApp em `app/` não achou nada. Não existe
mecanismo de billing/repasse de custo de mensageria pro cliente hoje.
Textualmente correto só o que é política pública da própria Meta:
conversas normais de atendimento (lead manda mensagem primeiro) têm
cota mensal gratuita; mensagens de campanha (categoria Marketing) têm
tabela paga da Meta. Zenvia/Wati praticam repasse transparente disso
— é um modelo saudável **de referência pro futuro**, não algo que a
Puka já implementou. Nesta fase inicial (modo manual, número
conectado pela própria equipe da Puka dentro do Business Portfolio
dela), quem paga a Meta pelo tráfego dos pilotos é a própria Puka —
ainda não existe um mecanismo de repasse de custo por cliente.

## ✅ Reprecificação em 2026-08-19 — 2 planos, ciclos trimestral/semestral/anual

**Substitui a seção acima** (a estrutura de 3 planos de 2026-08-14 não
vale mais). Pedido do usuário: reduzir de 3 pra 2 planos, adicionar
cobrança trimestral/semestral/anual (além do mensal), e restringir a
Agenda de agendamentos ao plano mais caro. Pesquisa de mercado feita
antes de decidir os números (6 concorrentes: Huggy, JivoChat, Wati,
Kommo, Digisac, Umbler Talk) - achado: **nenhum concorrente pesquisado
tem trimestral/semestral explícito**, o padrão do mercado é binário
(mensal vs. anual) - escalonar em 3 níveis é diferencial de vendas, não
alinhamento de mercado. Ver decisão #54 do `CLAUDE.MD` do backend pro
desenho técnico completo (enforcement real da Agenda por plano, cálculo
de rateio generalizado pra qualquer ciclo, migration de dados).

- **Essencial** (era Starter) — R$197/mês, preço mensal **mantido**
  (Digisac cobra exatamente R$197 de entrada, Umbler R$69-198 - segue
  bem posicionado). Mesmas features de antes.
- **Completo** (funde Professional + Enterprise) — R$397/mês, preço
  mensal do antigo Professional **mantido** (Huggy, bem mais caro no
  topo, confirma que ainda está barato pro segmento). Ganha os
  diferenciais que eram só do Enterprise (funcionários ilimitados, fila
  de campanha prioritária, onboarding assistido, SLA) **sem aumentar o
  preço** - não custa nada tecnicamente hoje, não existe trava de
  quantidade de funcionário no sistema. **Agenda de agendamentos vira
  exclusiva daqui** - novidade desta reprecificação, com **trava real
  no backend** (não é só posicionamento de marketing como o resto).
- **Enterprise deixa de ser coluna formal** - vira só uma nota fora da
  tabela ("Rede, franquia ou operação em volume maior? Fale com a
  gente") pra negociação de verdade, não uma 3ª opção de preço fixo.
- **Ciclos de cobrança**: mensal (preço cheio) + trimestral (-8%) +
  semestral (-15%) + anual (-20%, mesmo desconto que já era usado só
  pro anual antes) - validados contra a pesquisa (Huggy ~20% anual,
  JivoChat 15%, Wati 25%, Kommo ~8-14% via "meses bônus").
- **`Pricing.tsx`** - seletor de ciclo virou 4 botões (era 2, Mensal/
  Anual) e a grade de planos virou `sm:grid-cols-2` (era `lg:grid-cols-3`).
  Preço exibido calculado na hora (`monthlyPrice * (1 - desconto)`),
  com nota "R$X cobrado a cada N meses" pra ciclos não-mensais.
- **`Faq.tsx`** - resposta do Puka Copilot atualizada pra "só no
  Completo" (dizia "Professional e Enterprise"); pergunta nova sobre a
  Agenda ser exclusiva do Completo (feature nova o suficiente pra
  merecer objeção própria).
- **`app/cadastro/page.tsx`** - `planLabels` (usado só pro badge
  cosmético "Plano selecionado: X" na URL `?plano=`) atualizado pros
  slugs novos (`essencial`/`completo`) - `SignupForm.tsx` continua sem
  ler esse parâmetro pra decidir nada no payload real (mesmo
  comportamento de antes, o backend sempre usa o plano default).
- **Rodapé de Preços atualizado** - a nota antiga dizia que "os limites
  de cada plano... dependem de combinado direto com a gente, não de um
  bloqueio automático" - agora **parcialmente desatualizada**: a Agenda
  já tem trava real no backend (`SchedulingRequiresCompletoPlanError`),
  só funcionários/Copilot continuam sem enforcement. Texto ajustado pra
  refletir essa diferença.
- Testado: `npm run build`/`npm run lint` limpos.

## CORS — configuração necessária no backend

O domínio deste site precisa estar em `CORS_ORIGINS` no `.env` do
`crm-backend` (já suporta múltiplas origens, separadas por vírgula — ver
`CLAUDE.md` do backend, seção sobre CORS). Sem isso, o formulário de
cadastro não consegue chamar a API do navegador. Este site já está
deployado em `https://puka-crm-landing.vercel.app` — **essa URL precisa
estar em `CORS_ORIGINS`** pro cadastro funcionar em produção. Usar o
**domínio de produção** (o que aparece fixo em Project Settings, não a
URL com hash tipo `<projeto>-<hash>-<team>.vercel.app` que cada
deployment individual ganha) — foi exatamente esse detalhe que causou um erro de CORS ao
validar o deploy do `crm-frontend` em 2026-07-29 (ver `CLAUDE.md` de lá).

⚠️ **Confirmado quebrado em 2026-08-04, ainda não corrigido** — testado
com `curl -X OPTIONS https://pukacrm.duckdns.org/companies -H "Origin:
https://puka-crm-landing.vercel.app" ...`, resposta `400 Disallowed CORS
origin`. `https://puka-crm-landing.vercel.app` **não está** em
`CORS_ORIGINS` na VM de produção do backend — precisa ser adicionado lá
(fora deste repositório, requer acesso à VM) antes do cadastro funcionar
de verdade em produção. Até lá, o sintoma no navegador é erro de
rede/CORS no console, não um erro de negócio normal — mesmo sintoma já
descrito no `CLAUDE.md` do `crm-frontend`.

## ✅ Corrigido em 2026-08-04 — `POST /companies` batendo em `localhost:8000` em produção

Mesmo bug de classe já documentado no `CLAUDE.md` do `crm-frontend`
(deploy de 2026-07-29): o projeto `puka-crm-landing` na Vercel **não
tinha nenhuma Environment Variable configurada** (`vercel env ls`
confirmou lista vazia) — build de produção caiu nos fallbacks de dev de
`lib/api.ts`. Confirmado inspecionando o bundle JS servido de verdade em
`https://puka-crm-landing.vercel.app/cadastro`: continha `localhost:8000`,
nenhuma ocorrência de `pukacrm`.

Corrigido via Vercel CLI (`vercel link` no projeto `my-team-1452bee4/
puka-crm-landing`, depois `vercel env add ... production` pras três
variáveis, depois `vercel deploy --prod --force` pra forçar rebuild sem
cache — env var do Next.js é inlineada em build time, mudar sem
redeploy não tem efeito):

- `NEXT_PUBLIC_API_URL=https://pukacrm.duckdns.org`
- `NEXT_PUBLIC_APP_URL=https://puka-crm-web.vercel.app`
- `NEXT_PUBLIC_SITE_URL=https://puka-crm-landing.vercel.app`

Confirmado no bundle novo: `pukacrm.duckdns.org` e `puka-crm-web.vercel.app`
presentes, nenhuma ocorrência de `localhost`. **Isso resolve só a URL
correta sendo chamada** — o cadastro continua não funcionando de ponta a
ponta por causa do bloqueio de CORS descrito no aviso logo acima, que é
um fix separado do lado do backend.

## Estrutura de páginas (já construída, não é mais só sugestão)

A nota anterior aqui descrevia uma estrutura "sugerida" como planejamento
— **desatualizada**: a home já está construída de ponta a ponta
(`app/page.tsx` + `components/`), com um sistema de marca próprio
(`app/globals.css`): escala de roxo derivada de `--brand-600`
(`#B105DB`), um ciano análogo (`--accent-*`) usado só em destaques (ex:
o Puka Copilot), e três motivos visuais recorrentes no lugar de
gradiente/blob genérico — listras diagonais a 135° (`.diagonal-lines*`),
grade de pontos (`.dot-grid*`, as "bolinhas" de marca) e cantos cortados
(`.notch-tr`/`.notch-bl`/`.notch-both`, com `.btn-cut` no mesmo espírito
pros botões). Fonte é Geist (padrão do Next.js/Vercel), não uma escolha
genérica de IA.

- **Home** (`components/Hero.tsx`) — proposta de valor (IA atende
  primeiro, time assume quando precisa), mockup de conversa de WhatsApp
  no motivo `.notch-both`, CTA de cadastro.
- **Como funciona** (`HowItWorks.tsx`) — 3 passos, do primeiro contato ao
  CRM organizado.
- **Funcionalidades** (`Features.tsx`) — grid de 6 cards (IA
  configurável, CRM, distribuição, histórico, controle de acesso por
  cargo, API oficial da Meta).
- **Puka Copilot** (`CopilotSpotlight.tsx`, **novo em 2026-08-14**) —
  seção assimétrica dedicada (texto + mockup de sugestão em tempo real),
  não mais um item genérico dentro do grid de Features — o copiloto é o
  maior diferencial competitivo achado na pesquisa de mercado (ver seção
  "Planos e preços"), merecia destaque próprio. Usa a cor `--accent-*`
  (não o roxo de marca) pra sinalizar visualmente "isso é uma camada de
  IA à parte", consistente com o badge do Copilot na seção de Preços.
- **Casos de uso** (`UseCases.tsx`) — grid de 6 segmentos (academias,
  clínicas, escolas, consultorias, imobiliárias, comércio em geral).
- **Preços** (`Pricing.tsx`) — os 3 planos, ver seção "Planos e preços"
  acima pro conteúdo completo. CTA de Starter/Professional é "comece
  grátis" (cadastro direto, trial); CTA do Enterprise é "fale com a
  gente" (`mailto:contato@pukacrm.com.br` — endereço ainda não existe de
  verdade, precisa virar um e-mail real antes do lançamento). Sem
  checkout de verdade nesta fase — ver ressalvas na seção "O que este
  site faz".
- **FAQ** (`Faq.tsx`, **novo em 2026-08-14**) — `<details>/<summary>`
  nativos (acessível por padrão, sem JS de estado), respondendo objeção
  real de quem está decidindo: não é WhatsApp Web/QR Code (é API oficial
  da Meta), a IA não substitui a equipe, custo de mensageria da Meta é à
  parte, não precisa de CNPJ nem cartão pra testar, e em quais planos o
  Copilot está.
- **Cadastro** (`/cadastro`) — formulário mapeado no fluxo acima.
- Rodapé: Termos de Uso e Política de Privacidade — `/termos` e
  `/privacidade` (ver seção dedicada abaixo).

## ✅ Escrito em 2026-08-19 — Termos de Uso e Política de Privacidade

Motivador imediato: o Google exige uma URL pública de política de
privacidade pra verificar o app OAuth usado na sincronização com Google
Calendar (`crm-backend`, decisão #52) — mas o conteúdo também resolve a
obrigação real de LGPD que já estava pendente desde a Fase 1 (`app/
privacidade/page.tsx`/`app/termos/page.tsx` só tinham um placeholder
"aguardando jurídico").

- **Conteúdo grounded no código real**, não modelo genérico - reflete
  exatamente o que o `crm-backend` coleta e processa hoje: dados de
  Company/Employee/Lead, conteúdo de conversa (texto e áudio transcrito,
  áudio nunca persistido - decisão #19), credenciais criptografadas
  (Fernet)/senha com hash, os terceiros reais (Meta/WhatsApp, Google/
  Gemini + Google Calendar, Asaas). Distingue papel de **controlador**
  (dados da empresa contratante/funcionários) vs **operador** (dados dos
  leads que a empresa contratante atende - ela decide a finalidade, o
  Puka só processa).
- **⚠️ Não é redação jurídica final** - é um rascunho tecnicamente
  correto (baseado no sistema real, não em suposição), mas precisa de
  revisão de advogado antes do lançamento público de verdade, dado o
  risco real de multa da ANPD por LGPD malfeita. Mesma ressalva que já
  existia no placeholder anterior.
- E-mail de contato usa `contato@pukacrm.com.br` - mesmo endereço
  placeholder já referenciado no CTA do Enterprise em `Pricing.tsx`
  (ainda não existe de verdade, precisa virar um e-mail real antes do
  lançamento, mesma pendência já registrada ali).
- Testado: `npm run build`/`npm run lint` limpos, as duas rotas geradas
  como páginas estáticas (`○ /privacidade`, `○ /termos`).

**Ajuste de 2026-08-14**: `FinalCta.tsx` usava
`bg-gradient-to-br from-brand-600 to-brand-800` — removido em favor de
`bg-brand-800` sólido (+ os motivos de marca já existentes, `.dot-grid-invert`
e uma tira `.diagonal-lines-accent`). Gradiente decorativo genérico é um
dos "tells" mais reconhecíveis de site feito por IA sem direção de
design; o resto do site já evitava isso, esse era o único lugar que
ainda usava.

## Comandos úteis

```bash
npx create-next-app@latest . --typescript --tailwind --app

npm run dev
```
