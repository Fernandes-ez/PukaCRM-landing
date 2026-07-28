import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="notch-both relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center sm:px-16">
        <div className="absolute inset-0 dot-grid-invert opacity-70" aria-hidden />
        <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pronto pra deixar a IA cuidar do primeiro contato?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
          Cadastre sua empresa em poucos minutos e comece a atender no
          WhatsApp com IA hoje mesmo.
        </p>
        <div className="relative mt-8">
          <Link
            href="/cadastro"
            className="btn-cut inline-block bg-white px-8 py-3.5 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Comece grátis
          </Link>
        </div>
      </div>
    </section>
  );
}
