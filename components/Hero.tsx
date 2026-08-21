"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ParticleField from "@/components/motion/ParticleField";
import Reveal from "@/components/motion/Reveal";

const CONNECTOR_PATH = "M 328 34 C 220 90, 200 150, 142 214 C 100 260, 120 330, 336 414";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", stage);
    const sweeps = gsap.utils.toArray<HTMLElement>("[data-hero-sweep]", stage);

    const mm = gsap.matchMedia();

    // Desktop + motion allowed: pin the stage and step through the 3
    // headline lines as the visitor scrolls, each transition wiped by a
    // diagonal bar (the same 135° motif used everywhere else on the site,
    // here doing the work of the transition instead of just decorating it).
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(lines[0], { opacity: 1, yPercent: 0, rotateX: 0 });
      gsap.set([lines[1], lines[2]], { opacity: 0, yPercent: 55, rotateX: 35 });
      gsap.set(sweeps, { y: "-50%", scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to({}, { duration: 1 })
        .to(sweeps[0], { scaleX: 1, transformOrigin: "left center", duration: 0.4 })
        .to(lines[0], { yPercent: -55, opacity: 0, rotateX: -30, duration: 0.4 }, "<")
        .to(lines[1], { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.4 }, "<0.1")
        .to(sweeps[0], { scaleX: 0, transformOrigin: "right center", duration: 0.4 }, "-=0.15")
        .to({}, { duration: 1 })
        .to(sweeps[1], { scaleX: 1, transformOrigin: "left center", duration: 0.4 })
        .to(lines[1], { yPercent: -55, opacity: 0, rotateX: -30, duration: 0.4 }, "<")
        .to(lines[2], { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.4 }, "<0.1")
        .to(sweeps[1], { scaleX: 0, transformOrigin: "right center", duration: 0.4 }, "-=0.15")
        .to({}, { duration: 0.8 });

      return () => {
        gsap.set(lines, { clearProps: "all" });
        gsap.set(sweeps, { clearProps: "all" });
      };
    });

    // Mobile, or reduced motion: no pin, just the 3 lines stacked normally
    // (default CSS layout) with a light fade-in — or nothing at all if the
    // visitor asked for reduced motion.
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(lines, { clearProps: "all" });
      if (prefersReduced) {
        gsap.set(lines, { opacity: 1 });
        return;
      }
      gsap.set(lines, { opacity: 0, y: 24 });
      gsap.to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Stage: pinned on desktop, the headline steps through itself as
          you scroll instead of appearing all at once beside a screenshot. */}
      <section
        ref={stageRef}
        className="relative flex h-screen min-h-[560px] items-center overflow-hidden"
      >
        <div
          className="dot-grid-soft pointer-events-none absolute inset-0 opacity-20 dark:opacity-15"
          aria-hidden
        />
        <ParticleField className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-70" />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase dark:text-brand-400">
              <span className="h-3 w-3 diagonal-lines-accent" />
              Atendimento no WhatsApp com IA
            </span>
          </Reveal>

          <h1
            className="relative mt-8 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl lg:motion-safe:h-[4.7rem] xl:text-7xl xl:motion-safe:h-[5.6rem]"
            style={{ perspective: "800px" }}
          >
            {/* lg:motion-safe:* (not plain lg:*) on purpose: the absolute
                stacking below only makes sense while the pin timeline is
                actually driving these lines. A desktop visitor with
                reduced motion gets the plain stacked heading instead —
                same as mobile — never 3 lines glued on top of each other. */}
            <span
              data-hero-line
              className="block lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:flex lg:motion-safe:items-center lg:motion-safe:whitespace-nowrap"
            >
              A IA atende primeiro.
            </span>
            <span
              data-hero-line
              className="relative mt-1 block lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:mt-0 lg:motion-safe:flex lg:motion-safe:items-center lg:motion-safe:whitespace-nowrap"
            >
              <span className="relative z-10">Seu time assume</span>
              <span
                className="absolute inset-x-0 bottom-1.5 -z-0 h-3.5 diagonal-lines opacity-60 sm:h-5"
                aria-hidden
              />
            </span>
            <span
              data-hero-line
              className="block lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:flex lg:motion-safe:items-center lg:motion-safe:whitespace-nowrap"
            >
              só quando precisa.
            </span>

            {/* Diagonal wipe bars — hidden until the pin timeline drives them;
                only rendered at all when the pin is active (motion-safe), so
                a reduced-motion visitor at desktop width never sees a stray
                bar frozen mid-headline. GSAP owns their transform entirely
                (y + scaleX together) — no CSS translate utility here, since
                that would fight whatever GSAP writes to `transform`. */}
            <span
              data-hero-sweep
              aria-hidden
              className="diagonal-lines pointer-events-none absolute top-1/2 left-0 hidden h-3 w-full lg:motion-safe:block xl:h-4"
            />
            <span
              data-hero-sweep
              aria-hidden
              className="diagonal-lines-accent pointer-events-none absolute top-1/2 left-0 hidden h-3 w-full lg:motion-safe:block xl:h-4"
            />
          </h1>
        </div>

        {/* Anchored to the section itself (full-height), not the text
            wrapper above (only as tall as its content) — otherwise this
            sits right under the headline instead of near the real bottom
            of the screen. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-8 hidden text-center text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase lg:motion-safe:block lg:motion-safe:animate-pulse">
          role pra continuar
        </span>
      </section>

      {/* Value prop, CTA and the conversation — a normal scrolling block,
          no longer paired 1:1 with an app-screenshot mockup. */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground text-balance">
                <strong className="font-semibold text-foreground">Puka CRM</strong> é uma
                plataforma pra atender clientes no WhatsApp com inteligência artificial e
                organizar tudo num CRM — leads, conversas e equipe num lugar só.
                Feito pra academias, clínicas, escolas e negócios que vivem de
                atendimento.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row">
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
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-4 text-sm text-muted-foreground">
                Grátis pra começar · sem cartão de crédito
              </p>
            </Reveal>
          </div>

          {/* Desktop: bubbles scattered and stitched together by a dotted
              connector (same dash motif as "Como funciona"), instead of a
              screenshot boxed inside a phone/app frame. */}
          <Reveal delay={0.2} className="relative hidden h-[480px] w-full max-w-[460px] lg:ml-auto lg:block">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 460 460"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={CONNECTOR_PATH}
                fill="none"
                stroke="var(--brand-300)"
                strokeWidth="2"
                strokeDasharray="1 10"
                strokeLinecap="round"
              />
            </svg>

            <div
              className="absolute top-0 right-0 max-w-[260px] rounded-lg rounded-tr-sm bg-brand-600 px-4 py-3 text-sm text-white shadow-lg shadow-brand-900/20"
              style={{ transform: "rotate(-4deg)" }}
            >
              Oi! Quero saber sobre os planos da academia
            </div>

            <div
              className="absolute top-[170px] left-0 max-w-[280px] rounded-lg rounded-tl-sm border border-border bg-card px-4 py-3 text-sm shadow-lg shadow-brand-900/10 dark:shadow-black/30"
              style={{ transform: "rotate(3deg)" }}
            >
              Claro! Temos planos mensal e anual. Quer que eu já verifique
              horários de aula perto de você?
            </div>

            <div
              className="absolute top-[340px] right-4 max-w-[220px] rounded-lg rounded-tr-sm bg-brand-600 px-4 py-3 text-sm text-white shadow-lg shadow-brand-900/20"
              style={{ transform: "rotate(-2deg)" }}
            >
              Perfeito, pode ser
            </div>

            <div className="absolute bottom-0 left-6 inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-background/90 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              Transferido pro time comercial
            </div>
          </Reveal>

          {/* Mobile: the same conversation, simple and stacked — no pin,
              no scatter, just a compact card. */}
          <div className="notch-both relative w-full border border-border bg-card p-6 lg:hidden">
            <div className="absolute inset-0 dot-grid-soft opacity-[0.5]" />
            <div className="relative space-y-2.5">
              <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                Oi! Quero saber sobre os planos da academia
              </div>
              <div className="max-w-[85%] rounded-lg rounded-tl-sm border border-border bg-background/90 px-3.5 py-2.5 text-sm">
                Claro! Temos planos mensal e anual. Quer que eu já verifique
                horários de aula perto de você?
              </div>
              <div className="ml-auto max-w-[70%] rounded-lg rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                Perfeito, pode ser
              </div>
            </div>
            <div className="relative mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Transferido pro time comercial
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
