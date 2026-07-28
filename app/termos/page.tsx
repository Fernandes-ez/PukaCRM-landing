import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

export default function TermosPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">Termos de Uso</h1>
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-6">
        <p className="text-sm leading-6 text-muted-foreground">
          Este conteúdo ainda não foi escrito. O texto definitivo dos Termos
          de Uso precisa ser redigido pela área jurídica antes do lançamento
          público da plataforma.
        </p>
      </div>
    </section>
  );
}
