import Reveal from "@/components/motion/Reveal";

const segments = [
  { name: "Academias", detail: "Matrícula, renovação e dúvidas sobre planos direto no WhatsApp.", notch: "notch-tr" as const },
  { name: "Clínicas", detail: "Triagem inicial e dúvidas de paciente respondidas na hora, com o time avisado quando precisa entrar.", notch: "notch-bl" as const },
  { name: "Escolas", detail: "Atendimento de matrícula e dúvidas de responsáveis, sem depender da secretaria o tempo todo.", notch: "notch-tr" as const },
  { name: "Consultorias", detail: "Qualificação de lead antes de cair na agenda de quem vende.", notch: "notch-bl" as const },
  { name: "Imobiliárias", detail: "Primeiro contato sobre imóveis e visitas, com o lead já organizado no funil.", notch: "notch-tr" as const },
  { name: "Comércio em geral", detail: "Dúvidas de produto, pedido e pós-venda sem fila de espera.", notch: "notch-bl" as const },
];

export default function UseCases() {
  return (
    <section id="casos-de-uso" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="max-w-2xl">
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
          <span className="h-3 w-3 diagonal-lines" />
          Casos de uso
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
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
            className={`${segment.notch} border border-border bg-card p-6 transition-colors hover:border-brand-300 dark:hover:border-brand-700`}
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
