import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, MapPin, Route } from "lucide-react";
import { getRoadmap, type RoadmapWave } from "@/lib/cin-roadmap";
import { formatNumber, formatPercent } from "@/lib/format";

const toneMap: Record<
  RoadmapWave["tone"],
  { bar: string; chip: string; ring: string }
> = {
  destructive: {
    bar: "bg-destructive",
    chip: "bg-destructive/10 text-destructive border-destructive/30",
    ring: "ring-destructive/20",
  },
  secondary: {
    bar: "bg-secondary",
    chip: "bg-secondary/20 text-foreground border-secondary/40",
    ring: "ring-secondary/30",
  },
  accent: {
    bar: "bg-accent",
    chip: "bg-accent/10 text-accent border-accent/30",
    ring: "ring-accent/20",
  },
  primary: {
    bar: "bg-primary",
    chip: "bg-primary/10 text-primary border-primary/30",
    ring: "ring-primary/20",
  },
};

export function ExecutionRoadmap() {
  const waves = getRoadmap();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start gap-3 rounded-lg border border-border bg-card p-4">
        <Route className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div className="text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Critério de priorização:</strong>{" "}
            cada onda combina <em>menor cobertura atual</em> (peso 70%) e{" "}
            <em>maior distância da capital</em> (peso 30%). Assim começamos
            pelas GREs mais críticas e logisticamente mais distantes, fechando
            o ciclo na Região Metropolitana de Teresina.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {waves.map((w) => (
          <WaveCard key={w.wave} wave={w} />
        ))}
      </div>
    </div>
  );
}

function WaveCard({ wave }: { wave: RoadmapWave }) {
  const t = toneMap[wave.tone];
  return (
    <Card className={`relative flex h-full flex-col overflow-hidden shadow-card ring-1 ${t.ring}`}>
      <span className={`absolute inset-x-0 top-0 h-1 ${t.bar}`} aria-hidden />
      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <header>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {wave.label}
            </p>
            <Badge variant="outline" className={`text-[10px] font-bold uppercase ${t.chip}`}>
              {wave.intensidade}
            </Badge>
          </div>
          <h3 className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-foreground">
            <CalendarRange className="h-4 w-4 text-muted-foreground" aria-hidden />
            {wave.periodo}
          </h3>
        </header>

        <dl className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-3 text-center">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              GREs
            </dt>
            <dd className="mt-0.5 text-xl font-extrabold tabular-nums text-foreground">
              {wave.gres.length}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Sem CIN
            </dt>
            <dd className="mt-0.5 text-xl font-extrabold tabular-nums text-foreground">
              {formatNumber(wave.totalSemCIN)}
            </dd>
          </div>
        </dl>

        <ol className="space-y-1.5">
          {wave.gres.map((g) => (
            <li
              key={g.codGRE}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background px-2.5 py-2 text-xs"
            >
              <div className="min-w-0">
                <p className="truncate font-bold text-foreground">{g.codGRE}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                  {g.sede}
                  {g.distanciaKm > 0 && (
                    <span className="tabular-nums">· {g.distanciaKm} km</span>
                  )}
                </p>
              </div>
              <span className="shrink-0 text-right">
                <span className="block text-[11px] font-bold tabular-nums text-foreground">
                  {formatPercent(g.pctComCIN)}
                </span>
                <span className="block text-[10px] text-muted-foreground">cobertura</span>
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
