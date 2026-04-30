import { Container } from "@/components/layout/Container";
import { ExternalLink } from "lucide-react";
import logoSeducPi from "@/assets/seduc-piaui-lockup.jpg";

export function InstitutionalHeader() {
  return (
    <header className="border-b border-border bg-card">
      <Container size="base">
        <div className="flex items-center justify-between gap-6 py-5">
          <div className="flex items-center gap-4">
            <img
              src={logoSeducPi}
              alt="Secretaria da Educação — SEDUC · Governo do Piauí"
              className="h-12 w-auto sm:h-14 lg:h-16"
            />
            <div className="hidden border-l border-border pl-4 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
      </Container>
      <div className="institutional-rule h-0.5 w-full" aria-hidden />
    </header>
  );
}
