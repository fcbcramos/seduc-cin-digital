import { ExternalLink } from "lucide-react";
import logoSeducPi from "@/assets/seduc-piaui-lockup.jpg";

export function InstitutionalHeader() {
  return (
    <div className="bg-card">
      <div className="mx-auto flex min-h-[96px] max-w-[1440px] items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <img
          src={logoSeducPi}
          alt="Secretaria da Educação — SEDUC · Governo do Piauí. Aqui tem trabalho. Aqui tem futuro."
          className="h-16 w-auto sm:h-20 lg:h-24 xl:h-28"
        />
        <div className="hidden text-right sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Painel Institucional
          </p>
          <p className="text-sm font-bold text-foreground">
            CIN nas Escolas — Rede Estadual
          </p>
          <a
            href="https://www.gov.br/governodigital/pt-br/identidade/identificacao-do-cidadao-e-carteira-de-identidade-nacional/carteira-de-identidade-nacional-cin"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
          >
            Portal CIN — gov.br
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </div>
      <div className="gradient-institutional h-1 w-full" aria-hidden />
    </div>
  );
}
