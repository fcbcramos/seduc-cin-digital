import { Card, CardContent } from "@/components/ui/card";
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
import { Building2, GraduationCap, MapPin, TrendingDown, TrendingUp } from "lucide-react";
import {
  getStudentByGre,
  getStudentTotals,
  getTopBestGres,
  getTopWorstGres,
} from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

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
    .sort((a, b) => parseInt(a.codGRE, 10) - parseInt(b.codGRE, 10))
    .map((g) => ({
      name: g.codGRE.replace("ª GRE", "ª"),
      pct: Number(g.pctComCIN.toFixed(1)),
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <DistributionCard totals={totals} />
        <RankingCard
          title="Top 5 — Melhores GREs"
          subtitle="Maior cobertura de CIN"
          icon={<TrendingUp className="h-4 w-4 text-accent" aria-hidden />}
          accentClass="border-l-accent"
          rows={best}
        />
        <RankingCard
          title="Top 5 — Prioritárias"
          subtitle="Menor cobertura — atenção imediata"
          icon={<TrendingDown className="h-4 w-4 text-destructive" aria-hidden />}
          accentClass="border-l-destructive"
          rows={worst}
        />
      </div>

      <Card className="border border-border shadow-card">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Cobertura CIN por Gerência Regional
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Sequência numérica das 21 GREs · cor indica status
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <LegendDot color={CHART_COLORS.accent} label="Adequado ≥70%" />
              <LegendDot color={CHART_COLORS.secondary} label="Atenção 40–69%" />
              <LegendDot color={CHART_COLORS.destructive} label="Crítico <40%" />
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
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

interface DistributionCardProps {
  totals: ReturnType<typeof getStudentTotals>;
}

function DistributionCard({ totals }: DistributionCardProps) {
  return (
    <Card className="h-full border border-border border-l-4 border-l-primary shadow-card">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-0.5">
            <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Distribuição geral</h3>
            <p className="text-xs text-muted-foreground">
              Estudantes Com vs Sem CIN
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-muted/50 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Cobertura atual
          </p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <span className="text-3xl font-extrabold leading-none text-foreground tabular-nums">
              {formatPercent(totals.pctComCIN)}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Meta 100%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <BreakdownRow
            label="Com CIN"
            count={totals.comCIN}
            pct={totals.pctComCIN}
            color={CHART_COLORS.accent}
            indicatorClassName="bg-accent"
            valueClassName="text-accent"
          />
          <BreakdownRow
            label="Sem CIN"
            count={totals.semCIN}
            pct={totals.pctSemCIN}
            color={CHART_COLORS.destructive}
            indicatorClassName="bg-destructive"
            valueClassName="text-destructive"
          />
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
          <SummaryMetric
            icon={<GraduationCap className="h-3.5 w-3.5" aria-hidden />}
            value={formatNumber(totals.estudantes)}
            label="estudantes"
          />
          <SummaryMetric
            icon={<Building2 className="h-3.5 w-3.5" aria-hidden />}
            value={String(totals.totalGREs)}
            label="GREs"
          />
          <SummaryMetric
            icon={<MapPin className="h-3.5 w-3.5" aria-hidden />}
            value={String(totals.totalMunicipios)}
            label="municípios"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface SummaryMetricProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function SummaryMetric({ icon, value, label }: SummaryMetricProps) {
  return (
    <span className="flex min-w-0 flex-col items-center gap-1">
      <span className="text-muted-foreground">{icon}</span>
      <strong className="max-w-full truncate font-semibold text-foreground tabular-nums">
        {value}
      </strong>
      <span className="max-w-full truncate">{label}</span>
    </span>
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

interface BreakdownRowProps {
  label: string;
  count: number;
  pct: number;
  color: string;
  indicatorClassName: string;
  valueClassName: string;
}

function BreakdownRow({
  label,
  count,
  pct,
  color,
  indicatorClassName,
  valueClassName,
}: BreakdownRowProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden
          />
          {label}
        </span>
        <span className={`text-sm font-bold tabular-nums ${valueClassName}`}>
          {formatPercent(pct)}
        </span>
      </div>
      <Progress value={pct} indicatorClassName={indicatorClassName} className="h-2" />
      <p className="mt-1 text-xs text-muted-foreground tabular-nums">
        {formatNumber(count)} estudantes
      </p>
    </div>
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
    <Card className={`border border-border border-l-4 ${accentClass} shadow-card`}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-0.5">{icon}</div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ol className="space-y-2.5">
          {rows.map((g, idx) => (
            <li
              key={g.codGRE}
              className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
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
              <span className="shrink-0 text-base font-bold tabular-nums text-foreground">
                {formatPercent(g.pctComCIN)}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
