import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Comece grátis",
  description:
    "Cadastre sua empresa e comece a atender no WhatsApp com IA hoje mesmo.",
};

const planLabels: Record<string, string> = {
  essencial: "Essencial",
  completo: "Completo",
};

export default async function CadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ plano?: string }>;
}) {
  const { plano } = await searchParams;
  const planLabel = plano ? planLabels[plano] : undefined;

  return (
    <section className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Comece grátis
        </h1>
        <p className="mt-3 text-muted-foreground">
          Leva menos de 2 minutos. Depois de criar a conta, você faz login no
          painel pra configurar o atendimento.
        </p>
        {planLabel && (
          <p className="mt-4 inline-flex items-center gap-2 border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
            Plano selecionado: {planLabel}
          </p>
        )}
      </div>

      <div className="mt-10">
        <SignupForm />
      </div>
    </section>
  );
}
