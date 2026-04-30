import { Badge } from "@/components/ui/badge";
import { Building2, CalendarDays, MapPin, Users } from "lucide-react";
import { getTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

export function Hero() {
  const t = getTotals();

  const microKpis = [
    { label: "Cobertura estudantes", value: formatPercent(t.pctEstudantes), icon: Users },
    { label: "Cobertura parentes", value: formatPercent(t.pctParentes), icon: Users },
    { label: "Municípios atendidos", value: formatNumber(t.totalMunicipios), icon: MapPin },
    { label: "GREs envolvidas", value: formatNumber(t.totalGREs), icon: Building2 },
  ];

  return (
    <header className="relative overflow-hidden">
      <div className="gradient-header text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground">
                  Projeto Institucional
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-secondary" aria-hidden />
                  Em execução
                </Badge>
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Projeto CIN nas Escolas
              </h1>
              <p className="mt-3 text-base text-primary-foreground/85 sm:text-lg">
                Iniciativa da Secretaria de Estado da Educação do Piauí para garantir que
                estudantes e familiares da rede estadual obtenham a Carteira de Identidade
                Nacional (CIN), reduzindo a subidentificação documental no estado.
              </p>

              <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-secondary" aria-hidden />
                  <dt className="font-medium text-primary-foreground/80">Órgão responsável:</dt>
                  <dd>SEDUC-PI</dd>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-secondary" aria-hidden />
                  <dt className="font-medium text-primary-foreground/80">Período:</dt>
                  <dd className="italic text-primary-foreground/70">A definir</dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-[28rem]">
              {microKpis.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur"
                >
                  <Icon className="mb-2 h-5 w-5 text-secondary" aria-hidden />
                  <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/70">
                    {label}
                  </p>
                  <p className="mt-1 text-2xl font-bold sm:text-3xl">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="gradient-institutional h-1.5 w-full" aria-hidden />
    </header>
  );
}
