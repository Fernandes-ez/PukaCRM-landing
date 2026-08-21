"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ParticleField from "@/components/motion/ParticleField";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mockup = mockupRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", section);
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", section);

      if (prefersReduced) {
        gsap.set([...lines, ...fades], { opacity: 1, y: 0 });
        if (mockup) gsap.set(mockup, { opacity: 1, y: 0, rotate: -2, scale: 1 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 36 });
      gsap.set(fades, { opacity: 0, y: 16 });
      if (mockup) gsap.set(mockup, { opacity: 0, y: 30, rotate: 3, scale: 0.95 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.11 })
        .to(fades, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.55")
        .to(mockup, { opacity: 1, y: 0, rotate: -2, scale: 1, duration: 1 }, "-=0.65");

      if (mockup) {
        gsap.to(mockup, {
          y: 34,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        className="dot-grid-soft pointer-events-none absolute inset-0 opacity-20 dark:opacity-15"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent 85%)" }}
        aria-hidden
      />
      <ParticleField
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-70"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent 80%)" }}
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10">
        <div>
          <span
            data-hero-fade
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400"
          >
            <span className="h-3 w-3 diagonal-lines-accent" />
            Atendimento no WhatsApp com IA
          </span>

          <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-[4.25rem]">
            <span data-hero-line className="block">
              A IA atende primeiro.
            </span>
            <span data-hero-line className="relative mt-1 block whitespace-nowrap">
              <span className="relative z-10">Seu time assume</span>
              <span
                className="absolute inset-x-0 bottom-1.5 -z-0 h-3.5 diagonal-lines opacity-60 sm:h-5"
                aria-hidden
              />
            </span>
            <span data-hero-line className="block">
              só quando precisa.
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground text-balance"
          >
            <strong className="font-semibold text-foreground">Puka CRM</strong> é uma
            plataforma pra atender clientes no WhatsApp com inteligência artificial e
            organizar tudo num CRM — leads, conversas e equipe num lugar só.
            Feito pra academias, clínicas, escolas e negócios que vivem de
            atendimento.
          </p>

          <div data-hero-fade className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/cadastro"
              className="btn-cut bg-brand-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-700"
            >
              Comece grátis
            </Link>
            <a
              href="#como-funciona"
              className="btn-cut border border-border px-7 py-3.5 text-center text-base font-semibold text-foreground transition-colors hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400"
            >
              Ver como funciona
            </a>
          </div>

          <p data-hero-fade className="mt-4 text-sm text-muted-foreground">
            Grátis pra começar · sem cartão de crédito
          </p>
        </div>

        <div className="relative hidden lg:block">
          <div
            ref={mockupRef}
            className="notch-both relative -mr-4 ml-auto aspect-square w-[104%] max-w-[420px] border border-border bg-card shadow-2xl shadow-brand-900/15 dark:shadow-black/40"
          >
            <div className="absolute inset-0 dot-grid-soft opacity-[0.5]" />
            <div className="absolute inset-6 rounded-lg border border-border/80 bg-background/90 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  IA no WhatsApp
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="ml-auto max-w-[75%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                  Oi! Quero saber sobre os planos da academia
                </div>
                <div className="max-w-[80%] rounded-lg rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm">
                  Claro! Temos planos mensal e anual. Quer que eu já verifique
                  horários de aula perto de você?
                </div>
                <div className="ml-auto max-w-[65%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                  Perfeito, pode ser
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Transferido pro time comercial
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
