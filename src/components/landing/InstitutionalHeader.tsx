import logoGovPi from "@/assets/governo-piaui.png";

export function InstitutionalHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-8">
        <div className="border-r border-border pr-4 leading-tight sm:pr-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            Secretaria
          </p>
          <p className="text-sm font-bold tracking-tight text-foreground sm:text-base">
            da Educação <span className="text-primary">— SEDUC</span>
          </p>
        </div>
        <img
          src={logoGovPi}
          alt="Governo do Piauí — Aqui tem trabalho. Aqui tem futuro."
          className="h-12 w-auto sm:h-14"
        />
      </div>
    </div>
  );
}
