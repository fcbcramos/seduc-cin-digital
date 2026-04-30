import { ExternalLink } from "lucide-react";
import logoSeducPi from "@/assets/seduc-piaui-lockup.jpg";

export function InstitutionalHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <div className="flex items-center gap-4">
          <img
            src={logoSeducPi}
            alt="Secretaria da Educação — SEDUC · Governo do Piauí"
            className="h-14 w-auto sm:h-16 lg:h-20"
          />
          <div className="hidden border-l border-border pl-4 sm:block">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-muted-foreground">
              SEDUC · Governo do Piauí
            </p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">
              Painel CIN nas Escolas
            </p>
          </div>
        </div>

        <a
          href="https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional/carteira-de-identidade-nacional-cin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Portal CIN — gov.br
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
      <div className="institutional-rule h-0.5 w-full" aria-hidden />
    </header>
  );
}
