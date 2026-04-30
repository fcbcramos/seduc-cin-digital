import { Card, CardContent } from "@/components/ui/card";
import { Route as RouteIcon } from "lucide-react";
import { getRoadmap, type RoadmapWave } from "@/lib/cin-roadmap";
import { formatNumber, formatPercent } from "@/lib/format";

const toneAccent: Record<RoadmapWave["tone"], string> = {
  destructive: "bg-critical",
  secondary: "bg-warning",
  accent: "bg-success",
  primary: "bg-primary",
};

const toneLabel: Record<RoadmapWave["tone"], string> = {
  destructive: "text-critical",
  secondary: "text-warning",
  accent: "text-success",
  primary: "text-primary",
};

export function ExecutionRoadmap() {
  const waves = getRoadmap();

  return (
    <div className="space-y-6">
      <Card className="border border-border shadow-none">
        <CardContent className="flex flex-wrap items-start gap-3 p-5">
          <RouteIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Critério de priorização:</span>{" "}
            cada onda combina menor cobertura atual (peso 70%) e maior distância da capital
            (peso 30%). O ciclo começa pelas GREs mais críticas e logisticamente distantes
            e fecha na Região Metropolitana de Teresina.
          </p>
        </CardContent>
      </Card>

      {/* Horizontal timeline */}
      <div className="relative">
        <div
          className="absolute left-0 right-0 top-[34px] hidden h-px bg-border lg:block"
          aria-hidden
        />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
          {waves.map((w) => (
            <li key={w.wave} className="relative flex flex-col">
              {/* Node */}
              <div className="relative flex flex-col items-center lg:items-start">
                <div className="flex w-full items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span
                    className={`relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-border lg:mb-3 lg:ml-0`}
                  >
                    <span className={`h-2 w-2 rounded-full ${toneAccent[w.tone]}`} />
                  </span>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {w.label}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-foreground">
                      {w.periodo.split(" · ")[0]}
                    </p>
                    <p className={`text-[11px] font-medium ${toneLabel[w.tone]}`}>
                      {w.intensidade}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="mt-3 flex flex-1 flex-col rounded-md border border-border bg-card p-3">
                <dl className="mb-3 flex items-baseline justify-between gap-2 border-b border-border pb-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      GREs
                    </dt>
                    <dd className="text-base font-semibold tabular-nums text-foreground">
                      {w.gres.length}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Sem CIN
                    </dt>
                    <dd className="text-base font-semibold tabular-nums text-foreground">
                      {formatNumber(w.totalSemCIN)}
                    </dd>
                  </div>
                </dl>
                <ul className="space-y-1.5">
                  {w.gres.map((g) => (
                    <li
                      key={g.codGRE}
                      className="flex items-center justify-between gap-2 text-[11px] leading-tight"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{g.codGRE}</p>
                        <p className="truncate text-[10px] text-muted-foreground">
                          {g.sede}
                        </p>
                      </div>
                      <span className="shrink-0 tabular-nums font-semibold text-foreground">
                        {formatPercent(g.pctComCIN)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
