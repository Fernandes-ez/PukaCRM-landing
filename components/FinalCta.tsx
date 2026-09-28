import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="relative overflow-hidden bg-coxia px-8 py-16 text-center sm:px-16">
        {/* A deixa (curva da marca), sangrando pela borda direita — ver
            puka-marca/logo/puka-simbolo-cor.svg. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="33 -694 479 694"
          className="pointer-events-none absolute top-0 right-0 h-full w-auto opacity-90"
        >
          <g transform="scale(1 -1)">
            <path fill="#E8704A" d="M364 527C318 450 221.02 344 221.02 270C221.02 192 280 86 312 0H512C458 92 386 180 386 262C386 334 452 440 498 527Z" />
          </g>
        </svg>

        <h2 className="relative font-display text-3xl font-bold tracking-tight text-roteiro sm:text-4xl">
          Pronto pra deixar a IA cuidar do primeiro contato?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-roteiro/80">
          Cadastre sua empresa em poucos minutos e comece a atender no
          WhatsApp com IA hoje mesmo.
        </p>
        <div className="relative mt-8">
          <Link href="/cadastro" className="inline-block bg-roteiro px-8 py-3.5 text-base font-semibold text-coxia transition-colors hover:bg-papel">
            Comece grátis
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
