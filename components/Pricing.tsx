"use client";

import Link from "next/link";
import { useState } from "react";

interface Plan {
  slug: string;
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  priceNote?: string;
  description: string;
  copilot: boolean;
  features: string[];
  cta: { label: string; href: string };
  notch: "notch-tr" | "notch-bl" | "notch-both";
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    monthlyPrice: 197,
    annualPrice: 158,
    description:
      "Pra montar a primeira operação de atendimento de verdade — consultório de 1-2 profissionais, academia pequena.",
    copilot: false,
    features: [
      "1 número de WhatsApp (API oficial da Meta)",
      "Até 3 funcionários",
      "IA de atendimento (Assistente configurável)",
      "CRM completo: pipeline, tarefas e observações",
      "Distribuição automática de leads",
      "Controle de acesso por cargo",
    ],
    cta: { label: "Comece grátis", href: "/cadastro?plano=starter" },
    notch: "notch-tr",
  },
  {
    slug: "professional",
    name: "Professional",
    monthlyPrice: 397,
    annualPrice: 318,
    description:
      "Pra equipe de vendas de verdade, com vários consultores revezando conversa no WhatsApp.",
    copilot: true,
    features: [
      "Tudo do Starter",
      "Até 10 funcionários",
      "Puka Copilot — sugestão de venda em tempo real",
      "Campanhas segmentadas, com agendamento e recorrência",
      "Templates com botões (resposta rápida, link, telefone)",
      "Suporte prioritário",
    ],
    cta: { label: "Comece grátis", href: "/cadastro?plano=professional" },
    notch: "notch-both",
    highlight: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    priceNote: "A partir de R$ 897/mês",
    description:
      "Pra redes, franquias e operações de atendimento em volume.",
    copilot: true,
    features: [
      "Tudo do Professional",
      "Funcionários ilimitados",
      "Puka Copilot incluído",
      "Condições sob medida pro seu volume de campanha",
      "Onboarding assistido + gerente de conta dedicado",
      "Suporte com SLA",
    ],
    cta: { label: "Fale com a gente", href: "mailto:contato@pukacrm.com.br" },
    notch: "notch-bl",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="precos" className="relative bg-muted/40">
      <div className="divider-stripes" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
            <span className="h-3 w-3 diagonal-lines" />
            Preços
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Planos que crescem junto com seu atendimento
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Comece grátis em qualquer plano — sem cartão de crédito.
          </p>

          <div
            role="group"
            aria-label="Cobrança mensal ou anual"
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-border p-1"
          >
            <button
              type="button"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                !annual ? "bg-brand-600 text-white" : "text-muted-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                annual ? "bg-brand-600 text-white" : "text-muted-foreground"
              }`}
            >
              Anual <span className="opacity-80">· −20%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => {
            const ctaClassName = `btn-cut mt-8 block px-6 py-3 text-center text-sm font-semibold transition-colors ${
              plan.highlight
                ? "bg-brand-600 text-white hover:bg-brand-700"
                : "border border-border text-foreground hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            }`;

            return (
              <div
                key={plan.slug}
                className={`${plan.notch} relative flex flex-col border bg-card p-8 ${
                  plan.highlight
                    ? "border-brand-400 dark:border-brand-600 lg:-my-3 lg:py-11"
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
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className="text-3xl font-bold tracking-tight">
                        R$ {annual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-sm text-muted-foreground">/mês</span>
                      {annual && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          cobrado anualmente
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-bold tracking-tight">
                        {plan.priceNote}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">sob consulta</p>
                    </>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((feature) => {
                    const isCopilotLine = feature.startsWith("Puka Copilot");
                    return (
                      <li key={feature} className="flex gap-2.5">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isCopilotLine ? "var(--accent-500)" : "var(--brand-500)"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-0.5 h-4 w-4 shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span className={isCopilotLine ? "font-semibold text-foreground" : "text-muted-foreground"}>
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                  {!plan.copilot && (
                    <li className="flex gap-2.5 opacity-60">
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
                      <span className="text-muted-foreground">Sem Puka Copilot</span>
                    </li>
                  )}
                </ul>

                {plan.cta.href.startsWith("mailto:") ? (
                  <a href={plan.cta.href} className={ctaClassName}>
                    {plan.cta.label}
                  </a>
                ) : (
                  <Link href={plan.cta.href} className={ctaClassName}>
                    {plan.cta.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-xs text-muted-foreground">
          Mensagens do dia a dia com quem te procura no WhatsApp são
          gratuitas. Só campanhas de Marketing têm um custo por envio,
          cobrado à parte pela própria Meta. Planos ainda em validação com
          os primeiros clientes: os limites de cada um (nº de funcionários,
          Copilot) hoje dependem de combinado direto com a gente, não de um
          bloqueio automático no sistema.
        </p>
      </div>
    </section>
  );
}
