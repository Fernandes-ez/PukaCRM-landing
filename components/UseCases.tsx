import Reveal from "@/components/motion/Reveal";

const segments = [
  { name: "Academias", detail: "Matrícula, renovação e dúvidas sobre planos direto no WhatsApp." },
  { name: "Clínicas", detail: "Triagem inicial e dúvidas de paciente respondidas na hora, com o time avisado quando precisa entrar." },
  { name: "Escolas", detail: "Atendimento de matrícula e dúvidas de responsáveis, sem depender da secretaria o tempo todo." },
  { name: "Consultorias", detail: "Qualificação de lead antes de cair na agenda de quem vende." },
  { name: "Imobiliárias", detail: "Primeiro contato sobre imóveis e visitas, com o lead já organizado no funil." },
  { name: "Comércio em geral", detail: "Dúvidas de produto, pedido e pós-venda sem fila de espera." },
];

export default function UseCases() {
  return (
    <section id="casos-de-uso" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
          <span className="eyebrow-haste" />
          Casos de uso
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Feito pra quem vive de atendimento
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Negócios com muita conversa repetitiva no WhatsApp e pouco tempo
          sobrando pra organizar tudo manualmente.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, i) => (
          <Reveal
            key={segment.name}
            delay={(i % 3) * 0.08}
            className="border border-border bg-card p-6 transition-colors hover:border-ribalta-funda dark:hover:border-ribalta-acesa"
          >
            <h3 className="font-semibold">{segment.name}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {segment.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
