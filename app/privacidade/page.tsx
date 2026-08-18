import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Puka CRM coleta, usa e protege dados pessoais, em conformidade com a LGPD.",
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

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Política de Privacidade</h1>
      <p className="mt-3 text-sm text-muted-foreground">Última atualização: {LAST_UPDATED}</p>

      <p className="mt-8 text-sm leading-6 text-muted-foreground">
        Esta política explica quais dados pessoais o Puka CRM coleta, para que os usa, com quem
        compartilha e quais direitos você tem sobre eles, em conformidade com a Lei Geral de
        Proteção de Dados (Lei nº 13.709/2018 — LGPD). Ela vale tanto para quem contrata a
        plataforma (a empresa cliente e seus funcionários) quanto para os dados dos clientes finais
        que essa empresa atende pelo WhatsApp através do Puka CRM.
      </p>

      <div className="mt-10 space-y-8">
        <Section id="quem-somos" title="1. Quem trata os seus dados">
          <p>
            O Puka CRM é operado pela {"{"}ezf.tech{"}"}, e atua de duas formas diferentes,
            dependendo de quem é o titular do dado:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Como controlador</strong>, para os dados da
              empresa contratante e dos seus funcionários (cadastro, login, uso da plataforma,
              cobrança) — decidimos como e por que esses dados são tratados.
            </li>
            <li>
              <strong className="text-foreground">Como operador</strong>, para os dados dos
              clientes/leads que a empresa contratante atende pelo WhatsApp usando o Puka CRM
              (nome, telefone, e-mail, histórico de conversa, observações internas) — nesse caso
              quem decide a finalidade do tratamento é a empresa contratante, e nós só processamos
              esses dados seguindo as instruções dela, através da plataforma.
            </li>
          </ul>
          <p>
            Se você é cliente de uma empresa que usa o Puka CRM e quer exercer algum direito sobre
            seus dados, o primeiro contato deve ser diretamente com essa empresa — ela é quem
            decide o que fazer com esses dados. Ainda assim, atendemos pedidos encaminhados por ela.
          </p>
        </Section>

        <Section id="dados-coletados" title="2. Quais dados coletamos">
          <p>
            <strong className="text-foreground">Da empresa contratante:</strong> razão social,
            nome fantasia, CPF ou CNPJ, e-mail, telefone e endereço (quando informado).
          </p>
          <p>
            <strong className="text-foreground">Dos funcionários com acesso à plataforma:</strong>{" "}
            nome, e-mail, telefone, cargo/nível de acesso e senha (armazenada com hash
            criptográfico — nunca em texto puro, nem por nós).
          </p>
          <p>
            <strong className="text-foreground">Dos clientes/leads atendidos pelo WhatsApp:</strong>{" "}
            nome, telefone, e-mail (quando informado), gênero e data de nascimento (só quando
            cadastrados manualmente pela empresa — a IA não pergunta isso na conversa), estágio no
            funil de vendas, tarefas e observações internas registradas pela equipe.
          </p>
          <p>
            <strong className="text-foreground">Conteúdo das conversas de WhatsApp:</strong> o
            texto das mensagens trocadas. Mensagens de áudio são transcritas por inteligência
            artificial para permitir o atendimento e a leitura pela equipe — o áudio original não é
            armazenado por nós; a cada nova solicitação, buscamos uma cópia direto da Meta.
          </p>
          <p>
            <strong className="text-foreground">Dados de pagamento:</strong> CPF/CNPJ e dados de
            cobrança necessários para gerar a assinatura. Não armazenamos dados de cartão de
            crédito — isso é processado diretamente pelo nosso parceiro de pagamentos (Asaas).
          </p>
          <p>
            <strong className="text-foreground">Integrações que você conecta
            voluntariamente:</strong> se um funcionário conecta a própria conta do Google Calendar,
            usamos essa conexão só para criar/atualizar/remover, na agenda pessoal dele, os eventos
            correspondentes aos agendamentos feitos no Puka CRM — nunca lemos o restante da agenda
            do Google de volta.
          </p>
          <p>
            <strong className="text-foreground">Dados de uso e acesso:</strong> endereço IP,
            horário de acesso, tipo de dispositivo/navegador e páginas visitadas, coletados
            automaticamente para segurança e diagnóstico de problemas.
          </p>
        </Section>

        <Section id="como-usamos" title="3. Para que usamos esses dados">
          <ul className="list-disc space-y-2 pl-5">
            <li>Viabilizar o cadastro, login e uso diário da plataforma.</li>
            <li>
              Fazer o atendimento automático via inteligência artificial (o conteúdo da conversa é
              enviado para o modelo de IA gerar uma resposta) e permitir que a equipe da empresa
              contratante continue o atendimento manualmente quando necessário.
            </li>
            <li>Organizar leads, tarefas, agendamentos e o histórico comercial no CRM.</li>
            <li>Processar cobranças e gerenciar a assinatura.</li>
            <li>Enviar notificações operacionais (novo lead, tarefa vencendo, cobrança pendente).</li>
            <li>Prevenir fraude, abuso e garantir a segurança da plataforma.</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
          <p>
            Não vendemos dados pessoais a terceiros, e não usamos o conteúdo das conversas dos
            clientes atendidos para nenhuma finalidade além de operar a plataforma para a empresa
            contratante.
          </p>
        </Section>

        <Section id="compartilhamento" title="4. Com quem compartilhamos dados">
          <p>
            Usamos alguns parceiros para operar a plataforma. Cada um recebe só o dado necessário
            para a função específica que exerce:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Meta (WhatsApp Business Platform)</strong> —
              recebe e envia as mensagens do WhatsApp, já que a conexão é feita pela API oficial da
              Meta.
            </li>
            <li>
              <strong className="text-foreground">Google (Gemini API)</strong> — recebe o conteúdo
              da conversa para gerar a resposta automática da IA e transcrever mensagens de áudio.
            </li>
            <li>
              <strong className="text-foreground">Google Calendar</strong> — recebe dados de um
              agendamento (nome e telefone do cliente, horário, observações) só quando um
              funcionário conecta voluntariamente a própria conta pessoal.
            </li>
            <li>
              <strong className="text-foreground">Asaas</strong> — processa a cobrança da
              assinatura (dados de pagamento e o CPF/CNPJ da empresa contratante).
            </li>
            <li>
              <strong className="text-foreground">Provedores de infraestrutura e hospedagem</strong>{" "}
              — hospedam o banco de dados e a aplicação.
            </li>
          </ul>
          <p>
            Alguns desses parceiros processam dados em servidores fora do Brasil. Nesses casos,
            exigimos que a transferência siga as garantias previstas na LGPD para transferência
            internacional de dados.
          </p>
        </Section>

        <Section id="base-legal" title="5. Base legal para o tratamento">
          <p>Dependendo do dado e da finalidade, tratamos dados pessoais com base em:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Execução de contrato</strong> — para prestar o
              serviço contratado pela empresa cliente.
            </li>
            <li>
              <strong className="text-foreground">Consentimento</strong> — por exemplo, ao conectar
              voluntariamente uma conta do Google Calendar.
            </li>
            <li>
              <strong className="text-foreground">Legítimo interesse</strong> — para prevenção a
              fraude e segurança da plataforma.
            </li>
            <li>
              <strong className="text-foreground">Cumprimento de obrigação legal ou regulatória</strong>{" "}
              — por exemplo, dados fiscais de cobrança.
            </li>
          </ul>
        </Section>

        <Section id="seguranca" title="6. Como protegemos os dados">
          <p>
            Senhas são armazenadas com hash criptográfico (nunca em texto puro). Credenciais
            sensíveis de integrações (como tokens de acesso ao WhatsApp) são armazenadas
            criptografadas no banco de dados, com uma chave separada das senhas de usuário.
            Comunicação entre o navegador e nossos servidores é criptografada (HTTPS). O acesso aos
            dados dentro da plataforma segue controle de permissões por cargo — cada funcionário só
            vê o que a função dele permite.
          </p>
          <p>
            Nenhum sistema é 100% livre de risco. Se identificarmos um incidente de segurança que
            afete dados pessoais, notificaremos as pessoas/empresas afetadas e a autoridade
            competente conforme exigido pela LGPD.
          </p>
        </Section>

        <Section id="retencao" title="7. Por quanto tempo guardamos os dados">
          <p>
            Mantemos os dados enquanto a conta estiver ativa e pelo tempo necessário para cumprir
            obrigações legais (por exemplo, fiscais) após o encerramento. Dados de conversas e
            registros comerciais ficam disponíveis enquanto a empresa contratante mantiver a conta
            ativa. Ao encerrar a conta, os dados podem ser removidos ou anonimizados, respeitando
            prazos de retenção legal quando aplicável.
          </p>
        </Section>

        <Section id="direitos" title="8. Seus direitos como titular de dados">
          <p>De acordo com o artigo 18 da LGPD, você pode solicitar, a qualquer momento:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirmação de que tratamos seus dados pessoais.</li>
            <li>Acesso aos dados que temos sobre você.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
            <li>Portabilidade dos dados para outro fornecedor.</li>
            <li>Eliminação dos dados tratados com base no seu consentimento.</li>
            <li>Informação sobre com quem compartilhamos seus dados.</li>
            <li>Revogação do consentimento, quando o tratamento se basear nele.</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelo e-mail abaixo. Se você é cliente de
            uma empresa que usa o Puka CRM (não é quem contratou a plataforma diretamente),
            direcione o pedido primeiro à empresa — ela é a controladora desses dados.
          </p>
        </Section>

        <Section id="cookies" title="9. Cookies">
          <p>
            Usamos apenas cookies e armazenamento local essenciais ao funcionamento do site e da
            plataforma — por exemplo, para manter sua sessão logada e lembrar sua preferência de
            tema (claro/escuro). Não usamos cookies de rastreamento publicitário.
          </p>
        </Section>

        <Section id="alteracoes" title="10. Alterações nesta política">
          <p>
            Podemos atualizar esta política periodicamente. Mudanças relevantes serão comunicadas
            pelos canais habituais (e-mail ou aviso na plataforma) antes de entrarem em vigor.
          </p>
        </Section>

        <Section id="contato" title="11. Contato">
          <p>
            Dúvidas sobre esta política ou sobre o tratamento dos seus dados pessoais podem ser
            enviadas para{" "}
            <a href="mailto:contato@pukacrm.com.br" className="font-medium text-foreground underline underline-offset-2">
              contato@pukacrm.com.br
            </a>
            .
          </p>
          <p>
            Veja também os{" "}
            <Link href="/termos" className="font-medium text-foreground underline underline-offset-2">
              Termos de Uso
            </Link>
            .
          </p>
        </Section>
      </div>
    </section>
  );
}
