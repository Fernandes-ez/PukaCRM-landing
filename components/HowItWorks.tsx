import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "A IA responde na hora",
    description:
      "Configure o que a IA sabe sobre seu negócio e ela já atende quem chegar no WhatsApp — horário de funcionamento, dúvidas frequentes, condições de plano, o que você precisar.",
  },
  {
    number: "02",
    title: "O time entra quando faz sentido",
    description:
      "Se a conversa precisa de um humano, ela é distribuída automaticamente entre a equipe, com todo o histórico — ninguém repete pergunta.",
  },
  {
    number: "03",
    title: "Tudo organizado no CRM",
    description:
      "Cada conversa vira um lead com status, responsável e histórico completo. Sua equipe sabe exatamente em que pé cada cliente está.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
          <span className="eyebrow-haste" />
          Como funciona
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Do primeiro contato ao fechamento
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sem perder contexto no meio do caminho — cada etapa entrega pra
          próxima exatamente o que ela precisa saber.
        </p>
      </Reveal>

      {/* Conecta o passo 1 (IA, Ponto) aos passos 2-3 (equipe, Ribalta) —
          a mesma passagem que a marca representa em toda a plataforma. */}
      <div className="relative mt-16 hidden gap-0 sm:grid sm:grid-cols-3">
        <div className="absolute inset-x-0 top-10 hidden h-[2px] sm:block" style={{ left: "16.5%", right: "50%", background: "var(--puka-ponto)" }} />
        <div className="absolute inset-x-0 top-10 hidden h-[3px] rounded-full sm:block" style={{ left: "50%", right: "16.5%", background: "var(--puka-ribalta-funda)" }} />
      </div>

      <div className="mt-4 grid gap-8 sm:mt-0 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.1} className="border border-border bg-card p-8">
            <span className="font-mono text-sm font-semibold text-ribalta-funda dark:text-ribalta-acesa">
              {step.number}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {step.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
