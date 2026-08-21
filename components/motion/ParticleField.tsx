"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const MAX_DIST = 130;
const SPEED = 0.16;
const DOT_RADIUS = 1.5;

/**
 * Ambient node-network backdrop (dots drifting, connected by fading lines
 * when close) — a nod to the constellation/particle demos on threejs.org,
 * done with plain Canvas2D instead of a WebGL dependency (keeps this
 * SEO-sensitive marketing page light — see performance notes in
 * CLAUDE.md). Reads brand purple from CSS custom properties so light/dark
 * both work; freezes on prefers-reduced-motion and pauses off-screen tabs.
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let tabVisible = true;

    const isDark = () => document.documentElement.classList.contains("dark");

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      const target = Math.round((width * height) / 16000);
      const count = Math.min(60, Math.max(18, target));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const dark = isDark();
      const dotColor = dark ? "rgba(232, 136, 252, 0.6)" : "rgba(176, 5, 219, 0.45)";
      const lineBase = dark ? "232, 136, 252" : "176, 5, 219";
      const lineCeil = dark ? 0.32 : 0.2;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * lineCeil;
            ctx!.strokeStyle = `rgba(${lineBase}, ${alpha.toFixed(3)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = dotColor;
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (tabVisible) draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    seed();
    draw();

    if (!prefersReduced) {
      raf = requestAnimationFrame(loop);
    }

    function handleResize() {
      resize();
      seed();
      draw();
    }

    function handleVisibility() {
      tabVisible = document.visibilityState === "visible";
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    // Theme toggle flips the `dark` class on <html> — redraw once so the
    // static (reduced-motion) frame picks up the new palette immediately.
    const themeObserver = new MutationObserver(() => {
      if (prefersReduced) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
