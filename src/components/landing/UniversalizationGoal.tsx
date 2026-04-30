import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, CalendarClock } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { getServidorTotals } from "@/lib/cin-servidores";
import { formatNumber, formatPercent } from "@/lib/format";

export function UniversalizationGoal() {
  const students = getStudentTotals();
  const staff = getServidorTotals();

  const totalRede = students.estudantes + staff.total;
  const comCINRede = students.comCIN + staff.comCIN;
  const semCINRede = students.semCIN + staff.semCIN;
  const pct = totalRede === 0 ? 0 : (comCINRede / totalRede) * 100;

  return (
    <Card className="relative overflow-hidden shadow-card">
      <span className="gradient-institutional absolute inset-x-0 top-0 h-1" aria-hidden />
      <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr] lg:p-7">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"
            >
              <Target className="mr-1 h-3 w-3" aria-hidden /> Meta institucional
            </Badge>
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wide">
              <CalendarClock className="mr-1 h-3 w-3" aria-hidden /> Prazo dez/2026
            </Badge>
          </div>
          <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
            Universalizar a CIN em toda a rede SEDUC-PI
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Cobertura combinada (estudantes + servidores) — 2 ondas de 3 a 4 meses,
            com caravana das GREs.
          </p>

          <div className="mt-5">
            <div className="mb-1.5 flex items-end justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Progresso atual
              </span>
              <span className="text-2xl font-extrabold tabular-nums text-foreground">
                {formatPercent(pct)}
              </span>
            </div>
            <Progress
              value={pct}
              indicatorClassName="bg-primary"
              className="h-3"
              aria-label={`Cobertura combinada: ${formatPercent(pct)} de 100%`}
            />
            <p className="mt-1.5 text-[11px] text-muted-foreground tabular-nums">
              {formatNumber(comCINRede)} de {formatNumber(totalRede)} já regularizados
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 self-center lg:grid-cols-1">
          <GapTile
            label="Estudantes sem CIN"
            value={formatNumber(students.semCIN)}
            hint={`${formatPercent(students.pctSemCIN)} do total`}
            tone="destructive"
          />
          <GapTile
            label="Servidores sem CIN"
            value={formatNumber(staff.semCIN)}
            hint={`${formatPercent(staff.pctSemCIN)} do quadro`}
            tone="secondary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function GapTile({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "destructive" | "secondary";
}) {
  const toneMap = {
    destructive: "border-destructive/30 bg-destructive/5 text-destructive",
    secondary: "border-secondary/40 bg-secondary/10 text-foreground",
  } as const;
  return (
    <div className={`rounded-lg border px-4 py-3 ${toneMap[tone]}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-extrabold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}
