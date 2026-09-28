import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Atkinson_Hyperlegible_Next, Atkinson_Hyperlegible_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTriggerRefresh from "@/components/motion/ScrollTriggerRefresh";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Ainda sem domínio próprio — hospedado direto na URL padrão da Vercel.
// Ajustar quando um domínio de produção for configurado.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://puka-crm-landing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Puka — CRM com atendimento por IA no WhatsApp",
    template: "%s · Puka",
  },
  description:
    "A IA dá a deixa, seu time entra em cena. Atendimento automático no WhatsApp com IA, CRM completo e um copiloto de vendas — pra academias, clínicas, escolas e times de vendas.",
  openGraph: {
    title: "Puka — CRM com atendimento por IA no WhatsApp",
    description:
      "A IA dá a deixa, seu time entra em cena. Atendimento automático no WhatsApp com IA, CRM completo e um copiloto de vendas. Comece grátis.",
    url: siteUrl,
    siteName: "Puka",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puka — CRM com atendimento por IA no WhatsApp",
    description:
      "A IA dá a deixa, seu time entra em cena. Atendimento automático no WhatsApp com IA, CRM completo e um copiloto de vendas.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eee4",
};

// Aplica o tema salvo (ou a preferência do sistema) antes da hidratação,
// pra não piscar o tema errado no primeiro paint.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${atkinson.variable} ${atkinsonMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ribalta-funda focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-papel"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <ScrollTriggerRefresh />
      </body>
    </html>
  );
}
