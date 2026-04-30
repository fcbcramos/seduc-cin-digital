import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  getStudentByGre,
  getStudentTotals,
  getTopBestGres,
  getTopWorstGres,
} from "@/lib/cin-data";
import {
  coverageStatusLabel,
  formatNumber,
  formatPercent,
  getCoverageStatus,
} from "@/lib/format";

const statusClass: Record<
  ReturnType<typeof getCoverageStatus>,
  "status-success" | "status-warning" | "status-danger"
> = {
  success: "status-success",
  warning: "status-warning",
  danger: "status-danger",
};

const CHART_COLORS = {
  accent: "oklch(0.521 0.144 152)",
  secondary: "oklch(0.823 0.165 84)",
  destructive: "oklch(0.612 0.231 28)",
  primary: "oklch(0.502 0.158 252)",
  grid: "oklch(0.91 0.01 245)",
  axis: "oklch(0.5 0.02 250)",
} as const;

const barColor = (pct: number): string => {
  if (pct >= 70) return CHART_COLORS.accent;
  if (pct >= 40) return CHART_COLORS.secondary;
  return CHART_COLORS.destructive;
};

export function TerritorialDiagnosis() {
  const totals = getStudentTotals();
  const gres = getStudentByGre();
  const best = getTopBestGres(5);
  const worst = getTopWorstGres(5);

  const chartData = [...gres]
    .sort((a, b) => b.pctComCIN - a.pctComCIN)
    .map((g) => ({
      name: g.codGRE.replace("ª GRE", "ª"),
      pct: Number(g.pctComCIN.toFixed(1)),
    }));

  const donutData = [
    { name: "Com CIN", value: totals.comCIN, color: CHART_COLORS.accent },
    { name: "Sem CIN", value: totals.semCIN, color: CHART_COLORS.destructive },
  ];

  return (
    <div className="space-y-6">
      {/* Top row: donut + ranking columns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-5">
            <h3 className="mb-1 text-base font-semibold text-foreground">
              Distribuição geral
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Estudantes Com vs Sem CIN — rede estadual
            </p>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {donutData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number, name: string) => [formatNumber(v), name]}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid oklch(0.91 0.01 245)",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                <p className="mt-1 text-xs text-muted-foreground">Com CIN</p>
                <p className="text-lg font-bold text-accent">
                  {formatPercent(totals.pctComCIN)}
                </p>
              </div>
              <div>
                <span className="inline-block h-2 w-2 rounded-full bg-destructive" aria-hidden />
                <p className="mt-1 text-xs text-muted-foreground">Sem CIN</p>
                <p className="text-lg font-bold text-destructive">
                  {formatPercent(totals.pctSemCIN)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <RankingCard
          title="Top 5 — Melhores GREs"
          subtitle="Maior cobertura de CIN entre estudantes"
          icon={<TrendingUp className="h-4 w-4 text-accent" aria-hidden />}
          accentClass="border-l-accent"
          rows={best}
        />

        <RankingCard
          title="Top 5 — GREs prioritárias"
          subtitle="Menor cobertura — atenção imediata"
          icon={<TrendingDown className="h-4 w-4 text-destructive" aria-hidden />}
          accentClass="border-l-destructive"
          rows={worst}
        />
      </div>

      {/* Full-width comparative chart */}
      <Card className="shadow-card">
        <CardContent className="p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Cobertura CIN por Gerência Regional
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Ordenadas da maior para a menor cobertura · cor indica status
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <LegendDot color={CHART_COLORS.accent} label="Adequado ≥70%" />
              <LegendDot color={CHART_COLORS.secondary} label="Atenção 40–69%" />
              <LegendDot color={CHART_COLORS.destructive} label="Crítico <40%" />
            </div>
          </div>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 245)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.02 250)" }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.02 250)" }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v: number) => [`${v.toFixed(1)}%`, "Cobertura"]}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid oklch(0.91 0.01 245)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ display: "none" }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                  {chartData.map((d) => (
                    <Cell key={d.name} fill={barColor(d.pct)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {label}
    </span>
  );
}

interface RankingCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentClass: string;
  rows: ReturnType<typeof getStudentByGre>;
}

function RankingCard({ title, subtitle, icon, accentClass, rows }: RankingCardProps) {
  return (
    <Card className={`border-l-4 ${accentClass} shadow-card`}>
      <CardContent className="p-5">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ol className="space-y-2.5">
          {rows.map((g, idx) => {
            const status = getCoverageStatus(g.pctComCIN);
            return (
              <li
                key={g.codGRE}
                className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-card text-xs font-bold text-muted-foreground">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {g.codGRE}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatNumber(g.estudantes)} estudantes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums text-sm font-bold text-foreground">
                    {formatPercent(g.pctComCIN)}
                  </span>
                  <Badge variant="outline" className={`${statusClass[status]} text-[10px]`}>
                    {coverageStatusLabel[status]}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
