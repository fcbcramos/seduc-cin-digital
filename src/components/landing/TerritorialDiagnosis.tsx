import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  success: "oklch(0.55 0.14 152)",
  warning: "oklch(0.72 0.16 78)",
  danger: "oklch(0.55 0.20 28)",
  grid: "oklch(0.92 0.005 250)",
  axis: "oklch(0.5 0.02 250)",
} as const;

const barColor = (pct: number): string => {
  if (pct >= 70) return CHART_COLORS.success;
  if (pct >= 40) return CHART_COLORS.warning;
  return CHART_COLORS.danger;
};

export function TerritorialDiagnosis() {
  const totals = getStudentTotals();
  const gres = getStudentByGre();
  const best = getTopBestGres(5);
  const worst = getTopWorstGres(5);

  const chartData = [...gres]
    .sort((a, b) => parseInt(a.codGRE, 10) - parseInt(b.codGRE, 10))
    .map((g) => ({
      name: g.codGRE.replace("ª GRE", "ª"),
      pct: Number(g.pctComCIN.toFixed(1)),
    }));

  return (
    <div className="space-y-8">
      {/* Aggregate header — clean, no gauge */}
      <Card className="border border-border shadow-none">
        <CardContent className="p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_2fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Cobertura consolidada
              </p>
              <p className="mt-2 font-display text-5xl font-semibold tracking-tight text-foreground tabular-nums">
                {formatPercent(totals.pctComCIN)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="tabular-nums font-medium text-foreground">
                  {formatNumber(totals.comCIN)}
                </span>{" "}
                de{" "}
                <span className="tabular-nums font-medium text-foreground">
                  {formatNumber(totals.estudantes)}
                </span>{" "}
                estudantes da rede estadual
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-foreground">
                  Progresso até a meta de universalização
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {formatPercent(totals.pctComCIN)} / 100%
                </span>
              </div>
              <Progress
                value={totals.pctComCIN}
                className="h-2.5"
                indicatorClassName="bg-primary"
              />
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                <Stat label="GREs" value={String(totals.totalGREs)} />
                <Stat label="Municípios" value={String(totals.totalMunicipios)} />
                <Stat label="Sem CIN" value={formatNumber(totals.semCIN)} tone="danger" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings — symmetric, sober */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RankingCard
          title="Maior cobertura"
          subtitle="Top 5 GREs com melhor desempenho"
          icon={<TrendingUp className="h-4 w-4 text-positive" aria-hidden />}
          rows={best}
        />
        <RankingCard
          title="Menor cobertura"
          subtitle="Top 5 GREs prioritárias para mobilização"
          icon={<TrendingDown className="h-4 w-4 text-critical" aria-hidden />}
          rows={worst}
        />
      </div>

      {/* Comparative chart */}
      <Card className="border border-border shadow-none">
        <CardContent className="p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Cobertura por Gerência Regional
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Sequência numérica das 21 GREs · cor indica faixa de status
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
              <LegendDot color={CHART_COLORS.success} label="Adequado ≥70%" />
              <LegendDot color={CHART_COLORS.warning} label="Atenção 40–69%" />
              <LegendDot color={CHART_COLORS.danger} label="Crítico <40%" />
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                  tickLine={false}
                  axisLine={{ stroke: CHART_COLORS.grid }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(v: number) => [`${v.toFixed(1)}%`, "Cobertura"]}
                  contentStyle={{
                    borderRadius: 6,
                    border: "1px solid oklch(0.92 0.005 250)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
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

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "danger";
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-1 text-base font-semibold tabular-nums ${
          tone === "danger" ? "text-critical" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-2 w-2 rounded-sm"
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
  rows: ReturnType<typeof getStudentByGre>;
}

function RankingCard({ title, subtitle, icon, rows }: RankingCardProps) {
  return (
    <Card className="border border-border shadow-none">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start gap-3 border-b border-border pb-4">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ol className="divide-y divide-border">
          {rows.map((g, idx) => {
            const status = getCoverageStatus(g.pctComCIN);
            return (
              <li
                key={g.codGRE}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {g.codGRE}
                    </p>
                    <p className="text-[11px] text-muted-foreground tabular-nums">
                      {formatNumber(g.estudantes)} estudantes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tabular-nums text-sm font-semibold text-foreground">
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
