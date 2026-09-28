import Reveal from "@/components/motion/Reveal";

// Ícones do set da marca (puka-marca/icones/), traço 2px, currentColor —
// partes retas (stroke-linecap="butt") = haste, partes curvas (round) = deixa.
const featured = {
  title: "Atendimento por IA configurável",
  description:
    "Defina tom de voz, o que a IA pode responder e quando ela deve transferir a conversa pra um humano. É o primeiro contato do seu negócio, treinado do seu jeito.",
  icon: (
    <>
      <path d="M5.5 3.5V20.5" strokeLinecap="butt" strokeLinejoin="miter" />
      <path d="M10 9C11.4 10.6 11.4 13.4 10 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 6.5C16.4 9.5 16.4 14.5 13.5 17.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 4C21.2 8.4 21.2 15.6 17 20" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

const rest = [
  {
    title: "CRM de leads integrado",
    description:
      "Cada conversa vira um lead com etapa no funil e histórico completo — sem precisar exportar nada pra outra ferramenta.",
    icon: (
      <>
        <path d="M4 3.5V20.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M13.5 11A3 3 0 1 1 13.5 5A3 3 0 1 1 13.5 11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 20C8.8 16.6 10.8 14.5 13.5 14.5S18.2 16.6 18.5 20" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Distribuição entre a equipe",
    description:
      "Conversas que precisam de humano chegam pra pessoa certa, na fila certa — respeitando horário de trabalho e limite de atendimentos simultâneos.",
    icon: (
      <>
        <path d="M3 20.5H21" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M8.5 10A2.5 2.5 0 1 1 8.5 5A2.5 2.5 0 1 1 8.5 10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 11.5A2.5 2.5 0 1 1 16 6.5A2.5 2.5 0 1 1 16 11.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 17.5C4.8 14.8 6.4 13 8.5 13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17.5C12.3 15.9 13.8 14.5 16 14.5S19.7 15.9 20 17.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Histórico completo de conversa",
    description:
      "Nada se perde entre a IA e o time humano — cada mensagem, transferência e nota fica registrada no mesmo lugar.",
    icon: (
      <>
        <path d="M5 3.5V20.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M5 7.5H11" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M5 12H14" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M5 16.5H9" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M13 16.5C15.5 16.5 18 17.8 19.5 20" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Controle de acesso por cargo",
    description:
      "Cargos prontos pra usar — Dono, Administrador, Supervisor, Consultora e Recepção. Crie os seus se quiser algo diferente.",
    icon: <path d="M4 4h16v16H4V4Z M12 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z M7.5 17c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Conexão oficial com o WhatsApp",
    description:
      "API oficial da Meta pro WhatsApp Business — sem QR Code nem gambiarra que arrisca banir o número da sua empresa.",
    icon: (
      <>
        <path d="M7.5 15.5H4V4.5H20V15.5H12.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M10 17.5C9.4 19 8.2 20 6.5 20.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="relative bg-muted/40">
      <div className="h-px bg-border" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
            <span className="eyebrow-haste" />
            Funcionalidades
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo que o atendimento precisa, num lugar só
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            IA e CRM trabalhando juntos, sem depender de mais três
            ferramentas coladas com fita adesiva.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
          {/* Painel gigante — a deixa da marca sangrando pela borda, único
              elemento com curva nesta seção (regra 01: uma deixa por peça). */}
          <Reveal className="relative overflow-hidden border border-border bg-card p-8 lg:p-10">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="33 -694 479 694"
              className="pointer-events-none absolute -right-10 -bottom-16 h-[80%] w-auto opacity-[0.07] dark:opacity-[0.1]"
            >
              <g transform="scale(1 -1)">
                <path fill="var(--puka-ribalta)" d="M364 527C318 450 221.02 344 221.02 270C221.02 192 280 86 312 0H512C458 92 386 180 386 262C386 334 452 440 498 527Z" />
              </g>
            </svg>
            <span className="relative flex h-14 w-14 items-center justify-center border border-border text-ribalta-funda dark:text-ribalta-acesa">
              <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
                {featured.icon}
              </svg>
            </span>
            <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight">{featured.title}</h3>
            <p className="relative mt-3 max-w-sm text-base leading-7 text-muted-foreground">
              {featured.description}
            </p>
          </Reveal>

          {/* Lista compacta — hastes horizontais dividindo, não caixas
              repetidas. */}
          <div className="divide-y divide-border border border-border bg-card">
            {rest.map((feature, i) => (
              <Reveal key={feature.title} delay={0.08 + i * 0.06} className="flex gap-4 p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center text-ribalta-funda dark:text-ribalta-acesa">
                  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    {feature.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
