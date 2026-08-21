import Reveal from "@/components/motion/Reveal";

export default function CopilotSpotlight() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal y={20} className="relative order-2 lg:order-1">
          <div className="notch-both relative overflow-hidden border border-border bg-card p-6">
            <div className="absolute inset-0 dot-grid-soft opacity-[0.35]" />

            <div className="relative">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Conversa com o lead
              </span>
              <div className="mt-3 space-y-2.5">
                <div className="max-w-[85%] rounded-lg rounded-tl-sm border border-border bg-background/90 px-3.5 py-2.5 text-sm">
                  Achei o valor um pouco salgado perto de outras academias
                  aqui perto...
                </div>
                <div className="ml-auto max-w-[70%] rounded-lg rounded-tr-sm border border-dashed border-muted-foreground/40 bg-transparent px-3.5 py-2.5 text-sm text-muted-foreground italic">
                  digitando...
                </div>
              </div>
            </div>

            <div className="relative mt-5 border-t border-border pt-5">
              <div className="border border-accent-500/40 bg-accent-500/8 p-4 dark:border-accent-400/40 dark:bg-accent-400/10">
                <div className="flex items-center gap-2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-500)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wide text-accent-600 uppercase dark:text-accent-400">
                    Puka Copilot · só o consultor vê isso
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-6">
                  Objeção de preço. Reforce o parcelamento sem juros e ofereça
                  a avaliação física gratuita antes de falar em desconto.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-accent-600 uppercase dark:text-accent-400">
            <span className="h-3 w-3 diagonal-lines-accent" />
            Puka Copilot
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Enquanto seu time conversa, o Copilot já sabe o que sugerir
          </h2>
          <p className="mt-4 text-lg leading-7 text-muted-foreground text-balance">
            Quando um consultor assume a conversa, o Puka Copilot lê o
            histórico em tempo real e aparece com uma sugestão só quando
            identifica uma objeção de verdade — sem interromper à toa, e sem
            nunca falar com o cliente por conta própria.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Só entra em cena com objeção real — não em todo “oi” ou “obrigado”.",
              "Sugere o argumento, não escreve a mensagem — quem decide o que mandar continua sendo o consultor.",
              "Chega direto no painel, em tempo real — sem precisar pedir nada.",
            ].map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-6">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <a
            href="#precos"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-500 dark:text-accent-400"
          >
            Ver em quais planos
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
