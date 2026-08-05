const steps = [
  {
    number: "01",
    title: "A IA responde na hora",
    description:
      "Configure o que a IA sabe sobre seu negócio e ela já atende quem chegar no WhatsApp — horário de funcionamento, dúvidas frequentes, agendamento, o que você precisar.",
    notch: "notch-tr" as const,
  },
  {
    number: "02",
    title: "O time entra quando faz sentido",
    description:
      "Se a conversa precisa de um humano, ela é distribuída automaticamente entre a equipe, com todo o histórico — ninguém repete pergunta.",
    notch: "notch-bl" as const,
  },
  {
    number: "03",
    title: "Tudo organizado no CRM",
    description:
      "Cada conversa vira um lead com status, responsável e histórico completo. Sua equipe sabe exatamente em que pé cada cliente está.",
    notch: "notch-tr" as const,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
          <span className="h-3 w-3 diagonal-lines" />
          Como funciona
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Do primeiro contato ao fechamento
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sem perder contexto no meio do caminho — cada etapa entrega pra
          próxima exatamente o que ela precisa saber.
        </p>
      </div>

      <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
        <svg
          className="pointer-events-none absolute inset-x-0 top-10 hidden w-full sm:block"
          height="2"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <line
            x1="16%"
            y1="1"
            x2="84%"
            y2="1"
            stroke="var(--brand-300)"
            strokeWidth="2"
            strokeDasharray="1 10"
            strokeLinecap="round"
          />
        </svg>

        {steps.map((step) => (
          <div key={step.number} className={`${step.notch} border border-border bg-card p-8`}>
            <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              {step.number}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
