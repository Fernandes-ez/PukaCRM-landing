import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="dot-grid-soft pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent 85%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
            <span className="h-3 w-3 diagonal-lines-accent" />
            Atendimento no WhatsApp com IA
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            A IA atende primeiro.{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Seu time assume</span>
              <span
                className="absolute inset-x-0 bottom-1.5 -z-0 h-3.5 diagonal-lines opacity-60 sm:h-5"
                aria-hidden
              />
            </span>{" "}
            só quando precisa.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground text-balance">
            <strong className="font-semibold text-foreground">Puka CRM</strong> é uma
            plataforma pra atender clientes no WhatsApp com inteligência artificial e
            organizar tudo num CRM — leads, conversas e equipe num lugar só.
            Feito pra academias, clínicas, escolas e negócios que vivem de
            atendimento.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/cadastro"
              className="btn-cut bg-brand-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-700"
            >
              Comece grátis
            </Link>
            <a
              href="#como-funciona"
              className="btn-cut border border-border px-7 py-3.5 text-center text-base font-semibold text-foreground transition-colors hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Grátis pra começar · sem cartão de crédito
          </p>
        </div>

        <div className="relative hidden aspect-square lg:block">
          <div className="notch-both absolute inset-0 border border-border bg-card">
            <div className="absolute inset-0 dot-grid-soft opacity-[0.5]" />
            <div className="absolute inset-6 rounded-lg border border-border/80 bg-background/90 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  IA no WhatsApp
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="ml-auto max-w-[75%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                  Oi! Quero saber sobre os planos da academia
                </div>
                <div className="max-w-[80%] rounded-lg rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm">
                  Claro! Temos planos mensal e anual. Quer que eu já verifique
                  horários de aula perto de você?
                </div>
                <div className="ml-auto max-w-[65%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                  Perfeito, pode ser
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Transferido pro time comercial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
