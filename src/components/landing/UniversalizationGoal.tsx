import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CalendarCheck2, Users2 } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

export function UniversalizationGoal() {
  const t = getStudentTotals();
  const restantes = t.semCIN;

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary shadow-card">
      <CardContent className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[1.3fr_2fr] lg:items-center lg:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            <p className="eyebrow">Meta institucional</p>
          </div>
          <h3 className="mt-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            Universalizar a CIN em toda a rede SEDUC-PI
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Garantir que <strong className="text-foreground">100% dos estudantes</strong> da
            rede estadual concluam a emissão da Carteira de Identidade Nacional até
            dezembro de 2026.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-foreground">Progresso atual</span>
              <span className="text-2xl font-bold tabular-nums text-primary">
                {formatPercent(t.pctComCIN)}
              </span>
            </div>
            <Progress value={t.pctComCIN} className="h-3" indicatorClassName="bg-primary" />
            <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground tabular-nums">
              <span>0%</span>
              <span>Meta 100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            <Stat
              icon={Users2}
              label="A documentar"
              value={formatNumber(restantes)}
              hint="estudantes sem CIN"
            />
            <Stat
              icon={CalendarCheck2}
              label="Prazo final"
              value="Dez · 2026"
              hint="ciclo de execução"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="eyebrow">{label}</p>
        <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">{value}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}
