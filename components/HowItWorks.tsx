import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "A IA responde na hora",
    description:
      "Configure o que a IA sabe sobre seu negócio e ela já atende quem chegar no WhatsApp — horário de funcionamento, dúvidas frequentes, condições de plano, o que você precisar.",
    indent: "",
  },
  {
    number: "02",
    title: "O time entra quando faz sentido",
    description:
      "Se a conversa precisa de um humano, ela é distribuída automaticamente entre a equipe, com todo o histórico — ninguém repete pergunta.",
    indent: "sm:ml-14",
  },
  {
    number: "03",
    title: "Tudo organizado no CRM",
    description:
      "Cada conversa vira um lead com status, responsável e histórico completo. Sua equipe sabe exatamente em que pé cada cliente está.",
    indent: "sm:ml-28",
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

      <div className="relative mt-20 sm:pl-10">
        {/* A mesma linha de passagem do resto da marca, só que vertical:
            reta em Ponto enquanto é a IA sozinha, lacuna, curva à mão em
            Ribalta quando a pessoa entra — ver .linha-passagem/globals.css.
            Fica numa faixa própria à esquerda (sm:pl-10 acima) pra nunca
            cruzar os números — regra 04 do sistema gráfico, "sem
            sobreposição". */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          className="absolute top-2 bottom-2 left-0 hidden w-1 sm:block"
        >
          <path d="M2 0V30" stroke="var(--puka-ponto)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" fill="none" />
          <path
            d="M2 38C-3 46 8 54 2 62S -4 76 2 84S 8 92 2 100"
            stroke="var(--puka-ribalta-funda)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.12} y={20} className={`relative sm:max-w-md ${step.indent}`}>
              <span
                className="font-display block text-6xl leading-none font-bold sm:text-7xl"
                style={{ color: i === 0 ? "var(--puka-ponto)" : "var(--puka-ribalta-funda)" }}
              >
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
