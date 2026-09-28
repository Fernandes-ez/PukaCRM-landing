import Reveal from "@/components/motion/Reveal";

export default function CopilotSpotlight() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal y={20} className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden border border-border bg-card p-6">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Conversa com o lead
            </span>
            <div className="mt-3 space-y-2.5">
              <div className="max-w-[85%] border border-border bg-background/90 px-3.5 py-2.5 text-sm">
                Achei o valor um pouco salgado perto de outras academias
                aqui perto...
              </div>
              <div className="ml-auto max-w-[70%] border border-dashed border-muted-foreground/40 px-3.5 py-2.5 text-sm text-muted-foreground italic">
                digitando...
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <div className="border-l-4 border-ribalta bg-background/60 p-4">
                <div className="flex items-center gap-2">
                  <span className="eyebrow-haste bg-ribalta-funda dark:bg-ribalta-acesa" />
                  <span className="font-mono text-xs font-semibold tracking-wide text-ribalta-funda uppercase dark:text-ribalta-acesa">
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
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
            <span className="eyebrow-haste" />
            Puka Copilot
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
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
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ribalta-funda dark:bg-ribalta-acesa" />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <a
            href="#precos"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ribalta-funda hover:text-ribalta dark:text-ribalta-acesa"
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
