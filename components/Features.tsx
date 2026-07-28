const features = [
  {
    title: "Atendimento por IA configurável",
    description:
      "Defina tom de voz, o que a IA pode responder e quando ela deve transferir a conversa pra um humano.",
    notch: "notch-tr" as const,
    icon: <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Zm-7 9a7 7 0 0 0 14 0M12 20v2" />,
  },
  {
    title: "CRM de leads integrado",
    description:
      "Cada conversa vira um lead com etapa, valor e histórico — sem precisar exportar nada pra outra ferramenta.",
    notch: "notch-bl" as const,
    icon: <path d="M3 4h18M3 4v16h18V4M3 4l9 8 9-8M8 14h.01M8 17h4" />,
  },
  {
    title: "Distribuição entre a equipe",
    description:
      "Conversas que precisam de humano chegam pra pessoa certa, na fila certa — sem grupo de WhatsApp bagunçado.",
    notch: "notch-bl" as const,
    icon: <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 20v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    title: "Histórico completo de conversa",
    description:
      "Nada se perde entre a IA e o time humano — cada mensagem, transferência e nota fica registrada no mesmo lugar.",
    notch: "notch-tr" as const,
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />,
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="relative bg-muted/40">
      <div className="divider-stripes" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
            <span className="h-3 w-3 diagonal-lines" />
            Funcionalidades
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo que o atendimento precisa, num lugar só
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            IA e CRM trabalhando juntos, sem depender de mais três
            ferramentas coladas com fita adesiva.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`${feature.notch} flex gap-4 border border-border bg-card p-6`}
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-brand-200 dark:border-brand-800">
                <span className="absolute inset-0 diagonal-lines-soft" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--brand-600)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="relative h-5 w-5 dark:stroke-[var(--brand-400)]">
                  {feature.icon}
                </svg>
              </span>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
