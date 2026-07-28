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
- **Estrutura de domínio**: este site vive na raiz do domínio
  (`suaempresa.com`), o app autenticado num subdomínio
  (`app.suaempresa.com`). Times de marketing/growth eventualmente mexem
  só aqui, sem tocar no código do app.

## Stack

- **Next.js** (não Vite/CRA) — precisa de SSG/SSR pra SEO de verdade.
  React se mantém consistente com o `crm-frontend` (mesmo conhecimento,
  eventualmente componentes de UI podem ser compartilhados).
- **Tailwind CSS** — mesma escolha do `crm-frontend`, pra manter
  consistência visual entre marketing e app.
- Deploy recomendado: Vercel (integração nativa com Next.js, CDN global,
  preview deployments por PR).

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

`POST {API_URL}/companies` (sem autenticação, endpoint público) — payload:

```json
{
  "name": "string (2-150)",
  "slug": "string (2-100, regex ^[a-z0-9-]+$, único)",
  "email": "email da empresa",
  "phone": "string (8-25)",
  "legal_name": "opcional",
  "document": "opcional (CNPJ)",
  "owner_full_name": "string (2-150)",
  "owner_email": "email de login do dono da conta",
  "owner_password": "mínimo 8 caracteres"
}
```

Devolve `CompanyRead` (**sem token de acesso** — o cadastro não loga
automaticamente). Depois de um cadastro bem-sucedido, o fluxo certo é
**redirecionar pro login do app** (`https://app.suaempresa.com/login`,
idealmente com o `owner_email` pré-preenchido), não tentar autenticar
direto — `POST /companies` e `POST /auth/login` são chamadas separadas.

⚠️ **Backend TODO antes de expor esse formulário publicamente de
verdade**: `POST /companies` hoje não tem nenhuma proteção contra abuso
(rate limit, captcha) — é um endpoint público que cria conta real no
banco. Antes do lançamento de verdade, vale pedir a adição de
rate-limiting por IP e/ou captcha (hCaptcha/Cloudflare Turnstile) no
backend. Documentado aqui pra não esquecer, não é trabalho deste repo.

## Planos e preços

Definido em 2026-07-21 (análise de mercado + custo de operação — os 3
concorrentes diretos mais próximos são Umbler Talk, Digisac, Whaticket e
BotConversa; este último é o mais parecido por já incluir IA). **Rascunho
pra validar com clientes piloto antes de considerar definitivo, mas já
serve de conteúdo real pra construir a página.** IA de atendimento entra
nos três planos — é o motivo de compra, não um upsell. Onboarding
assistido também entra nos três por enquanto (todo cliente nessa fase
precisa de ajuda configurando o Assistente e conectando o WhatsApp).

**⚠️ Evitar jargão técnico no texto da página** (ex: não escrever "RBAC")
— usar linguagem que a pessoa que está comprando reconhece: "controle de
acesso por cargo", "quem da equipe pode ver/fazer o quê".

### Starter — R$ 127/mês (R$ 97/mês no plano anual)
- 1 número de WhatsApp
- Até 3 funcionários
- IA de atendimento (Assistente configurável)
- CRM de Leads e histórico de conversas
- Controle de acesso por cargo
- Onboarding assistido

Pra quem: começando a organizar o atendimento — consultório de 1-2
profissionais, academia pequena.

### Professional — R$ 297/mês (R$ 247/mês no plano anual) — plano em destaque
- Tudo do Starter
- Até 10 funcionários
- Distribuição automática de leads e conversas
- Pipeline de vendas e tarefas (CRM completo)
- Relatórios de atendimento

Pra quem: equipe de atendimento de verdade, múltiplos atendentes
revezando — é onde a maioria dos clientes-alvo deve cair. Destacar
visualmente esse plano na página (é o "recomendado").

### Enterprise — a partir de R$ 697/mês (sob consulta)
- Tudo do Professional
- Funcionários ilimitados
- Relatórios avançados e exportação de dados
- Suporte prioritário (SLA)
- Ajuda especializada na configuração do Assistente

Pra quem: operação de atendimento grande, equipe que já passou dos 10
funcionários. CTA deveria ser "fale com a gente", não um cadastro
self-service direto.

**Não oferecer**: plano com múltiplos números de WhatsApp — o produto
hoje só suporta 1 número por empresa (decisão de escopo já tomada no
backend). Se isso mudar no futuro, vira diferencial real do Enterprise.

**Cobrança anual**: ~20% de desconto em todos os planos (padrão do
mercado, é o que a Umbler Talk pratica) — ajuda fluxo de caixa e reduz
churn nos primeiros meses.

## CORS — configuração necessária no backend

O domínio deste site precisa estar em `CORS_ORIGINS` no `.env` do
`crm-backend` (já suporta múltiplas origens, separadas por vírgula — ver
`CLAUDE.md` do backend, seção sobre CORS). Sem isso, o formulário de
cadastro não consegue chamar a API do navegador.

## Estrutura de páginas sugerida

Baseado na doc de produto original (`crm-backend/Documentao_plataforma_crm.pdf`,
seções 1-2 — visão geral, público-alvo):

- **Home** — proposta de valor (IA atende primeiro, time assume quando
  precisa, tudo organizado num CRM só), como funciona, CTA de cadastro.
- **Funcionalidades** — atendimento automatizado por IA configurável,
  CRM/gestão de leads, distribuição entre a equipe, histórico completo
  de conversa.
- **Casos de uso / público-alvo** — academias, clínicas, escolas,
  consultorias, imobiliárias, comércio em geral (doc seção 1).
- **Preços** — os 3 planos já estão definidos, ver seção "Planos e
  preços" acima pro conteúdo completo. CTA de Starter/Professional é
  "comece grátis" (cadastro direto, trial); CTA do Enterprise é "fale
  com a gente" (sem self-service). Sem checkout de verdade nesta fase —
  ver ressalvas na seção "O que este site faz".
- **Cadastro** (`/cadastro` ou modal na home) — formulário mapeado no
  fluxo acima.
- Rodapé: Termos de Uso e Política de Privacidade — **conteúdo ainda não
  existe**, precisa ser escrito (jurídico) antes do lançamento público;
  por ora pode ser placeholder.

## Comandos úteis

```bash
npx create-next-app@latest . --typescript --tailwind --app

npm run dev
```
