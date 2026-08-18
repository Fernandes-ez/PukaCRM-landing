import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso da plataforma Puka CRM.",
};

const LAST_UPDATED = "19 de agosto de 2026";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function TermosPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Termos de Uso</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última atualização: {LAST_UPDATED}</p>

      <p className="mt-8 text-sm leading-6 text-muted-foreground">
        Estes Termos de Uso regulam a contratação e o uso da plataforma Puka CRM (&ldquo;Puka
        CRM&rdquo;, &ldquo;plataforma&rdquo;, &ldquo;nós&rdquo;) pela empresa que cria uma conta
        (&ldquo;cliente&rdquo;, &ldquo;você&rdquo;) e pelos funcionários autorizados por ela a
        acessá-la. Ao criar uma conta, você declara ter lido, entendido e aceitado estes termos.
      </p>

      <div className="mt-10 space-y-8">
        <Section id="descricao" title="1. O que é o Puka CRM">
          <p>
            O Puka CRM é uma plataforma de atendimento via WhatsApp com inteligência artificial e
            CRM, voltada a pequenas e médias empresas. A IA faz o primeiro contato com o cliente
            final e transfere a conversa para um atendente humano quando necessário. A plataforma
            também organiza leads, tarefas, agendamentos e histórico comercial.
          </p>
          <p>
            A conexão com o WhatsApp é feita através da API oficial da Meta (WhatsApp Business
            Platform) — o uso da plataforma está sujeito também às políticas da Meta para essa
            API, inclusive quanto a envio de mensagens e prevenção de spam.
          </p>
        </Section>

        <Section id="conta" title="2. Cadastro e conta">
          <p>
            Para usar o Puka CRM, a empresa cliente cria uma conta informando dados verdadeiros,
            completos e atualizados (incluindo CPF ou CNPJ). Você é responsável por manter essas
            informações corretas e por toda atividade realizada na conta, inclusive pelos
            funcionários que convidar.
          </p>
          <p>
            Cada funcionário recebe credenciais de acesso individuais. Você é responsável por
            manter essas credenciais em sigilo e por revogar o acesso de funcionários que deixem a
            empresa ou não devam mais usar a plataforma.
          </p>
        </Section>

        <Section id="teste-assinatura" title="3. Teste gratuito e assinatura">
          <p>
            Novas contas começam com um período de teste gratuito, sem necessidade de cartão de
            crédito. Ao final do período de teste, a continuidade do uso depende da contratação de
            um dos planos pagos disponíveis, com cobrança recorrente processada pelo nosso parceiro
            de pagamentos.
          </p>
          <p>
            O não pagamento de uma cobrança pode resultar em restrição de acesso a funcionalidades
            da plataforma até a regularização, conforme detalhado na própria plataforma. Preços,
            planos e limites podem ser alterados mediante aviso prévio; alterações não afetam
            cobranças já efetuadas.
          </p>
          <p>
            Você pode cancelar a assinatura a qualquer momento. O cancelamento interrompe cobranças
            futuras, mas não gera reembolso automático de períodos já pagos, salvo quando exigido
            por lei.
          </p>
        </Section>

        <Section id="uso-aceitavel" title="4. Uso aceitável">
          <p>Ao usar o Puka CRM, você concorda em não:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Usar a plataforma para enviar mensagens não solicitadas, spam, ou qualquer conteúdo
              que viole as políticas de mensageria da Meta para o WhatsApp — isso pode resultar no
              bloqueio do número de WhatsApp conectado, inclusive de forma permanente, por decisão
              da própria Meta, sem que tenhamos controle sobre isso.
            </li>
            <li>
              Usar a plataforma para fins ilegais, fraudulentos, discriminatórios ou que violem
              direitos de terceiros.
            </li>
            <li>
              Tentar acessar áreas da plataforma sem autorização, fazer engenharia reversa,
              sobrecarregar nossa infraestrutura propositalmente, ou interferir no funcionamento do
              serviço para outros clientes.
            </li>
            <li>Revender ou sublicenciar o acesso à plataforma sem autorização por escrito.</li>
          </ul>
          <p>
            Podemos suspender ou encerrar contas que violem este uso aceitável, especialmente
            quando isso colocar em risco a conexão de WhatsApp de outros clientes da plataforma.
          </p>
        </Section>

        <Section id="dados-do-cliente" title="5. Responsabilidade pelos dados inseridos">
          <p>
            Você é responsável por garantir que tem base legal para inserir na plataforma dados
            pessoais dos seus próprios clientes/leads (nome, telefone, histórico de conversa etc.),
            e por atender eventuais solicitações desses titulares relacionadas a esses dados —
            nessa relação, sua empresa é a controladora dos dados, e o Puka CRM atua como operador,
            processando esses dados conforme suas instruções através do uso normal da plataforma.
            Veja a{" "}
            <Link href="/privacidade" className="font-medium text-foreground underline underline-offset-2">
              Política de Privacidade
            </Link>{" "}
            para mais detalhes sobre esse papel.
          </p>
        </Section>

        <Section id="propriedade-intelectual" title="6. Propriedade intelectual">
          <p>
            A plataforma, sua marca, design e código são de propriedade da {"{"}ezf.tech{"}"} ou de
            seus licenciantes. Você recebe uma licença limitada, não exclusiva e intransferível para
            usar a plataforma durante a vigência do contrato, apenas para os fins previstos nestes
            termos. Os dados que você insere na plataforma continuam sendo seus.
          </p>
        </Section>

        <Section id="disponibilidade" title="7. Disponibilidade do serviço">
          <p>
            Nos esforçamos para manter a plataforma disponível de forma contínua, mas não garantimos
            operação ininterrupta ou livre de erros. Manutenções programadas, falhas de
            infraestrutura ou instabilidades de serviços de terceiros (como Meta, Google ou nosso
            parceiro de pagamentos) podem afetar a disponibilidade, sem que isso gere direito a
            indenização, salvo quando exigido por lei.
          </p>
        </Section>

        <Section id="limitacao" title="8. Limitação de responsabilidade">
          <p>
            Na máxima medida permitida por lei, não nos responsabilizamos por danos indiretos,
            lucros cessantes, perda de dados causada por uso indevido da plataforma, ou por
            consequências de decisões tomadas por terceiros (como bloqueio de número pela Meta em
            decorrência de uso em desacordo com a política dela). Nossa responsabilidade total,
            quando aplicável, fica limitada ao valor pago pela assinatura nos 12 meses anteriores ao
            evento que originou a reclamação.
          </p>
        </Section>

        <Section id="rescisao" title="9. Rescisão">
          <p>
            Você pode encerrar sua conta a qualquer momento pela própria plataforma. Podemos
            suspender ou encerrar contas em caso de violação destes termos, inadimplência não
            regularizada após aviso, ou por determinação legal. Ao encerrar a conta, seus dados são
            tratados conforme descrito na{" "}
            <Link href="/privacidade" className="font-medium text-foreground underline underline-offset-2">
              Política de Privacidade
            </Link>
            .
          </p>
        </Section>

        <Section id="alteracoes" title="10. Alterações nestes termos">
          <p>
            Podemos atualizar estes termos periodicamente. Mudanças relevantes serão comunicadas com
            antecedência razoável pelos canais habituais. O uso continuado da plataforma após uma
            alteração entrar em vigor representa concordância com os novos termos.
          </p>
        </Section>

        <Section id="lei-foro" title="11. Legislação aplicável e foro">
          <p>
            Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o
            foro do domicílio do prestador do serviço para dirimir eventuais controvérsias, com
            renúncia a qualquer outro, por mais privilegiado que seja.
          </p>
        </Section>

        <Section id="contato" title="12. Contato">
          <p>
            Dúvidas sobre estes termos podem ser enviadas para{" "}
            <a href="mailto:contato@pukacrm.com.br" className="font-medium text-foreground underline underline-offset-2">
              contato@pukacrm.com.br
            </a>
            .
          </p>
        </Section>
      </div>
    </section>
  );
}
