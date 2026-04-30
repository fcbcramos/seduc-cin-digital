import logoGovPi from "@/assets/governo-piaui.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <img
              src={logoGovPi}
              alt="Governo do Piauí"
              className="h-10 w-auto"
            />
            <div className="text-sm">
              <p className="font-semibold text-foreground">SEDUC-PI</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Secretaria de Estado da Educação do Piauí
              </p>
              <p className="text-xs text-muted-foreground">
                Projeto CIN nas Escolas
              </p>
            </div>
          </div>
          <p className="max-w-md text-xs text-muted-foreground sm:text-right">
            Dados de cobertura CIN: base diagnóstica institucional. Demais informações
            em consolidação.
          </p>
        </div>
      </div>
      <div className="gradient-institutional h-1 w-full" aria-hidden />
    </footer>
  );
}
