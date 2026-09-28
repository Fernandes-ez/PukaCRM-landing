import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="h-px bg-border" />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-2 text-sm text-muted-foreground">
              Atendimento no WhatsApp com IA e CRM completo pra pequenas e
              médias empresas.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-sm font-semibold">Produto</h3>
              <ul className="mt-3 -mx-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/#funcionalidades" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="/#casos-de-uso" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Casos de uso
                  </Link>
                </li>
                <li>
                  <Link href="/#precos" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="/cadastro" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Comece grátis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-3 -mx-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/termos" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="inline-block rounded-sm px-1 py-1.5 hover:text-foreground">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Puka CRM. Todos os direitos reservados.</span>
          <span className="font-semibold tracking-tight text-foreground">
            Feito por{" "}
            <span className="text-muted-foreground">{"{"}</span>
            ezf<span className="text-ribalta-funda dark:text-ribalta-acesa">.tech</span>
            <span className="text-muted-foreground">{"}"}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
