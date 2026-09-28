import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
            <span className="eyebrow-haste deixa-load-in" />
            Atendimento no WhatsApp com IA
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl">
            A IA atende primeiro.
            <br />
            <span className="text-ribalta-funda dark:text-ribalta-acesa">Seu time entra na deixa.</span>
          </h1>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground text-balance">
              <strong className="font-semibold text-foreground">Puka</strong> é uma
              plataforma pra atender clientes no WhatsApp com inteligência artificial e
              organizar tudo num CRM — leads, conversas e equipe num lugar só.
              Feito pra academias, clínicas, escolas e negócios que vivem de
              atendimento.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/cadastro" className="btn-primary px-7 py-3.5 text-center text-base transition-colors">
              Comece grátis
            </Link>
            <a href="#como-funciona" className="btn-secondary px-7 py-3.5 text-center text-base font-semibold transition-colors">
              Ver como funciona
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-sm text-muted-foreground">
              Grátis pra começar · sem cartão de crédito
            </p>
          </Reveal>
        </div>

        {/* Exemplo de conversa: cliente (Papel com borda) → IA (borda-esquerda
            Ponto) → linha de passagem → atendente humano (borda-esquerda
            Ribalta). Nada de balão verde/estilo WhatsApp — ver Tarefa B da
            regra de marca sobre a cor semântica IA=Ponto / humano=Ribalta. */}
        <Reveal delay={0.15} className="w-full max-w-[460px] lg:ml-auto">
          <div className="space-y-3">
            <div className="ml-auto max-w-[85%] border border-border bg-card px-4 py-3 text-sm">
              Oi! Quero saber sobre os planos da academia
            </div>

            <div className="max-w-[90%] border-l-4 border-ponto bg-card px-4 py-3 text-sm">
              <span className="font-mono text-xs text-ponto dark:text-ponto-claro">IA · 23:47</span>
              <p className="mt-1">
                Claro! Temos planos mensal e anual. Quer que eu já verifique
                horários de aula perto de você?
              </p>
            </div>

            <div className="linha-passagem py-1 font-mono text-xs text-ribalta-funda dark:text-ribalta-acesa">
              passou pra equipe
            </div>

            <div className="max-w-[90%] border-l-4 border-ribalta bg-card px-4 py-3 text-sm">
              <span className="font-mono text-xs text-ribalta-funda dark:text-ribalta-acesa">Marina · 08:02</span>
              <p className="mt-1">Bom dia! Vi que você já falou com nossa IA ontem à noite — posso te ajudar a fechar a matrícula agora?</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
