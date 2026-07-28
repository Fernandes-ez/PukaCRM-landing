import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://suaempresa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Puka CRM — Atendimento no WhatsApp com IA",
    template: "%s · Puka CRM",
  },
  description:
    "Atendimento automático no WhatsApp com IA e CRM completo pra academias, clínicas, escolas e times de vendas. Sua equipe assume a conversa só quando precisa.",
  openGraph: {
    title: "Puka CRM — Atendimento no WhatsApp com IA",
    description:
      "Atendimento automático no WhatsApp com IA e CRM completo pra pequenas e médias empresas. Comece grátis.",
    url: siteUrl,
    siteName: "Puka CRM",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puka CRM — Atendimento no WhatsApp com IA",
    description:
      "Atendimento automático no WhatsApp com IA e CRM completo pra pequenas e médias empresas.",
  },
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
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
