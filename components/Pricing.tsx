"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";

type Cycle = "monthly" | "quarterly" | "semiannual" | "annual";

const CYCLE_LABEL: Record<Cycle, string> = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  semiannual: "Semestral",
  annual: "Anual",
};

// Validado contra pesquisa de mercado (Huggy ~20% anual, JivoChat 15%,
// Wati 25%, Kommo ~8-14% via "meses bônus") - ver CLAUDE.md do
// crm-backend, decisão #54. Precisa ficar em sincronia manual com
// BILLING_CYCLE_DISCOUNT em app/modules/subscription/service.py.
const CYCLE_DISCOUNT: Record<Cycle, number> = {
  monthly: 0,
  quarterly: 0.08,
  semiannual: 0.15,
  annual: 0.2,
};

const CYCLE_MONTHS: Record<Cycle, number> = {
  monthly: 1,
  quarterly: 3,
  semiannual: 6,
  annual: 12,
};

interface Plan {
  slug: string;
  name: string;
  monthlyPrice: number;
  description: string;
  copilot: boolean;
  scheduling: boolean;
  features: string[];
  excludedFeatures: string[];
  cta: { label: string; href: string };
  notch: "notch-tr" | "notch-bl" | "notch-both";
  highlight?: boolean;
}

// Reprecificação de 2026-08-19 - reduzido de 3 pra 2 planos. Enterprise
// deixou de ser coluna formal; seus diferenciais (funcionários
// ilimitados, fila de campanha prioritária, onboarding assistido, SLA)
// entraram no Completo sem aumentar o preço. Precisa ficar em
// sincronia manual com PLAN_MONTHLY_PRICES em service.py.
const plans: Plan[] = [
  {
    slug: "essencial",
    name: "Essencial",
    monthlyPrice: 197,
    description:
      "Pra montar a primeira operação de atendimento de verdade — consultório de 1-2 profissionais, academia pequena.",
    copilot: false,
    scheduling: false,
    features: [
      "1 número de WhatsApp (API oficial da Meta)",
      "Até 3 funcionários",
      "IA de atendimento (Assistente configurável)",
      "CRM completo: pipeline, tarefas e observações",
      "Distribuição automática de leads",
      "Controle de acesso por cargo",
    ],
    excludedFeatures: ["Agenda de agendamentos", "Puka Copilot"],
    cta: { label: "Comece grátis", href: "/cadastro?plano=essencial" },
    notch: "notch-tr",
  },
  {
    slug: "completo",
    name: "Completo",
    monthlyPrice: 397,
    description:
      "Pra equipe de vendas de verdade, com agenda de horários e um copiloto de IA ajudando o consultor a fechar.",
    copilot: true,
    scheduling: true,
    features: [
      "Tudo do Essencial",
      "Funcionários ilimitados",
      "Agenda de agendamentos — inclusive a IA marcando horário sozinha",
      "Puka Copilot — sugestão de venda em tempo real",
      "Campanhas segmentadas, com agendamento e recorrência",
      "Templates com botões (resposta rápida, link, telefone)",
      "Fila de campanha prioritária + onboarding assistido",
      "Suporte prioritário com SLA",
    ],
    excludedFeatures: [],
    cta: { label: "Comece grátis", href: "/cadastro?plano=completo" },
    notch: "notch-both",
    highlight: true,
  },
];

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="precos" className="relative bg-muted/40">
      <div className="divider-stripes" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
            <span className="h-3 w-3 diagonal-lines" />
            Preços
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Dois planos, do jeito que o seu atendimento precisa
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Comece grátis em qualquer plano — sem cartão de crédito.
          </p>

          <div
            role="group"
            aria-label="Ciclo de cobrança"
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border p-1"
          >
            {(Object.keys(CYCLE_LABEL) as Cycle[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cycle === c}
                onClick={() => setCycle(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  cycle === c ? "bg-brand-600 text-white" : "text-muted-foreground"
                }`}
              >
                {CYCLE_LABEL[c]}
                {CYCLE_DISCOUNT[c] > 0 && (
                  <span className="opacity-80"> · −{CYCLE_DISCOUNT[c] * 100}%</span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2 sm:items-start">
          {plans.map((plan, i) => {
            const ctaClassName = `btn-cut mt-8 block px-6 py-3 text-center text-sm font-semibold transition-colors ${
              plan.highlight
                ? "bg-brand-600 text-white hover:bg-brand-700"
                : "border border-border text-foreground hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            }`;

            const discount = CYCLE_DISCOUNT[cycle];
            const monthlyEquivalent = Math.round(plan.monthlyPrice * (1 - discount));
            const totalCharge = Math.round(plan.monthlyPrice * CYCLE_MONTHS[cycle] * (1 - discount));

            return (
              <Reveal
                key={plan.slug}
                delay={i * 0.12}
                className={`${plan.notch} relative flex flex-col border bg-card p-8 ${
                  plan.highlight
                    ? "border-brand-400 dark:border-brand-600 sm:-my-3 sm:py-11"
                    : "border-border"
                }`}
              >
                {plan.highlight && (
                  <span className="mb-4 inline-block w-fit bg-brand-600 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                    Recomendado
                  </span>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-6">
                  <span className="text-3xl font-bold tracking-tight">R$ {monthlyEquivalent}</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                  {cycle !== "monthly" && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      R$ {totalCharge} cobrado a cada {CYCLE_MONTHS[cycle]} meses
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((feature) => {
                    const isCopilotLine = feature.startsWith("Puka Copilot");
                    const isSchedulingLine = feature.startsWith("Agenda de agendamentos");
                    const highlightColor = isCopilotLine || isSchedulingLine;
                    return (
                      <li key={feature} className="flex gap-2.5">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={highlightColor ? "var(--accent-500)" : "var(--brand-500)"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 h-4 w-4 shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span className={highlightColor ? "font-semibold text-foreground" : "text-muted-foreground"}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                  {plan.excludedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-2.5 opacity-60">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      >
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                      <span className="text-muted-foreground">Sem {feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.cta.href} className={ctaClassName}>
                  {plan.cta.label}
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-sm text-muted-foreground">
          Rede, franquia ou operação em volume maior?{" "}
          <a href="mailto:contato@pukacrm.com.br" className="font-medium text-foreground underline underline-offset-2">
            Fale com a gente
          </a>{" "}
          pra uma condição sob medida.
        </p>

        <p className="mx-auto mt-4 max-w-lg text-center text-xs text-muted-foreground">
          Mensagens do dia a dia com quem te procura no WhatsApp são
          gratuitas. Só campanhas de Marketing têm um custo por envio,
          cobrado à parte pela própria Meta. A Agenda de agendamentos é
          exclusiva do plano Completo (trava real na plataforma); número
          de funcionários e Puka Copilot ainda dependem de combinado
          direto com a gente, não de um bloqueio automático no sistema.
        </p>
      </div>
    </section>
  );
}
