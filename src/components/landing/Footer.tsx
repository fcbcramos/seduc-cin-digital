export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-foreground">SEDUC-PI</p>
            <p className="mt-1 text-xs">
              Secretaria de Estado da Educação do Piauí · Projeto CIN nas Escolas
            </p>
          </div>
          <p className="text-xs">
            Dados de cobertura CIN: base diagnóstica institucional · Demais informações em
            consolidação
          </p>
        </div>
      </div>
      <div className="gradient-institutional h-1 w-full" aria-hidden />
    </footer>
  );
}
