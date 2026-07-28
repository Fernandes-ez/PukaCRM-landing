import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacidadePage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/40 p-6">
        <p className="text-sm leading-6 text-muted-foreground">
          Este conteúdo ainda não foi escrito. O texto definitivo da Política
          de Privacidade precisa ser redigido pela área jurídica antes do
          lançamento público da plataforma.
        </p>
      </div>
    </section>
  );
}
