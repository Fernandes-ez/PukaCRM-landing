import Reveal from "@/components/motion/Reveal";

const faqs = [
  {
    question: "Isso é WhatsApp Web com QR Code?",
    answer:
      "Não. A conexão é pela API oficial da Meta (WhatsApp Business Cloud API) — nada de QR Code ou automação não-oficial que arrisca banir o número da sua empresa.",
  },
  {
    question: "A IA substitui minha equipe de atendimento?",
    answer:
      "Não. A IA faz o primeiro contato e resolve o que for repetitivo; quando a conversa precisa de alguém, ela é transferida pra um humano automaticamente, com todo o histórico junto.",
  },
  {
    question: "Preciso pagar a Meta separado da mensalidade?",
    answer:
      "No dia a dia, não: qualquer resposta de texto normal a quem te procura primeiro no WhatsApp é gratuita e sem limite. Só quando a plataforma manda uma mensagem de Template pra retomar contato fora de uma conversa em andamento — campanha de Marketing ou o lembrete automático de agendamento — é que a Meta cobra por envio. Nesta fase inicial, isso é combinado caso a caso com o nosso time, não é um valor que cai sozinho na sua fatura.",
  },
  {
    question: "Preciso de CNPJ pra começar?",
    answer:
      "Não. No cadastro pedimos CPF ou CNPJ — é exigência da nossa assinatura recorrente, não do WhatsApp — e CPF já resolve. Nesta fase inicial, quem conecta seu número de WhatsApp é a nossa própria equipe, dentro da nossa conta autorizada na Meta, então isso nem depende do seu documento.",
  },
  {
    question: "O Puka Copilot está em todos os planos?",
    answer:
      "Só no Completo. Ele entra em cena quando um consultor já assumiu a conversa — no Essencial, sem essa etapa ainda, o foco é o essencial de IA de atendimento e CRM.",
  },
  {
    question: "A Agenda de agendamentos está em todos os planos?",
    answer:
      "Só no Completo — inclusive a IA marcando horário sozinha durante a conversa, se você ativar essa opção. No Essencial, o foco continua sendo atendimento e CRM.",
  },
  {
    question: "Preciso de cartão de crédito pra testar?",
    answer:
      "Não. Você cria a conta e tem 14 dias de teste grátis em qualquer plano, sem pedir cartão.",
  },
];

export default function Faq() {
  return (
    <section id="perguntas" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal className="text-center">
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-ribalta-funda uppercase dark:text-ribalta-acesa">
          <span className="eyebrow-haste" />
          Perguntas frequentes
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Antes de começar
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold marker:content-none">
              {faq.question}
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}
