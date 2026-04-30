import { useMemo, useState } from "react";
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
import { Building2, GraduationCap, MapPin, TrendingDown, TrendingUp, X } from "lucide-react";
import {
  getCoverageBreakdownByGre,
  getStudentByGre,
  getStudentTotals,
  getTopBestGres,
  getTopWorstGres,
  type CoverageTier,
  type GreCoverageBreakdown,
  type GreCoverageMunicipality,
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

const TIER_META: Record<
  CoverageTier,
  { label: string; color: string; rangeLabel: string }
> = {
  adequado: { label: "Adequado", color: CHART_COLORS.accent, rangeLabel: "≥ 70%" },
  atencao: { label: "Atenção", color: CHART_COLORS.secondary, rangeLabel: "40–69%" },
  critico: { label: "Crítico", color: CHART_COLORS.destructive, rangeLabel: "< 40%" },
};

const TIER_ORDER: CoverageTier[] = ["adequado", "atencao", "critico"];

export function TerritorialDiagnosis() {
  const totals = getStudentTotals();
  const gres = getStudentByGre();
  const best = getTopBestGres(5);
  const worst = getTopWorstGres(5);

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

      <CoverageBreakdownCard greCount={gres.length} />
    </div>
  );
}

interface CoverageDatum extends GreCoverageBreakdown {
  shortLabel: string;
}

function CoverageBreakdownCard({ greCount }: { greCount: number }) {
  const [visibleTiers, setVisibleTiers] = useState<Set<CoverageTier>>(
    () => new Set(TIER_ORDER),
  );
  const [selectedGre, setSelectedGre] = useState<string | null>(null);

  const data: CoverageDatum[] = useMemo(
    () =>
      getCoverageBreakdownByGre().map((g) => ({
        ...g,
        shortLabel: g.codGRE.replace("ª GRE", "ª"),
      })),
    [],
  );

  const selected = useMemo(
    () => (selectedGre ? data.find((d) => d.codGRE === selectedGre) ?? null : null),
    [selectedGre, data],
  );

  const toggleTier = (tier: CoverageTier) => {
    setVisibleTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) {
        if (next.size === 1) return prev; // keep at least one visible
        next.delete(tier);
      } else {
        next.add(tier);
      }
      return next;
    });
  };

  const handleBarClick = (payload: unknown) => {
    if (typeof payload !== "object" || payload === null) return;
    const code = (payload as { codGRE?: unknown }).codGRE;
    if (typeof code !== "string") return;
    setSelectedGre((prev) => (prev === code ? null : code));
  };

  return (
    <Card className="border border-border shadow-card">
      <CardContent className="p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Cobertura CIN por Gerência Regional
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {greCount} GREs · municípios agrupados por faixa de cobertura · clique para detalhar
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {TIER_ORDER.map((tier) => {
              const meta = TIER_META[tier];
              const active = visibleTiers.has(tier);
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => toggleTier(tier)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                    active
                      ? "border-border bg-card text-foreground"
                      : "border-border/60 bg-muted/40 text-muted-foreground line-through opacity-60"
                  }`}
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: meta.color }}
                    aria-hidden
                  />
                  {meta.label} {meta.rangeLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="shortLabel"
                tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: CHART_COLORS.axis }}
                allowDecimals={false}
                label={{
                  value: "Municípios",
                  angle: -90,
                  position: "insideLeft",
                  offset: 16,
                  style: { fontSize: 11, fill: CHART_COLORS.axis },
                }}
              />
              <Tooltip
                cursor={{ fill: "oklch(0.95 0.01 250)", opacity: 0.5 }}
                content={<CoverageTooltip />}
              />
              {TIER_ORDER.filter((t) => visibleTiers.has(t)).map((tier, idx, arr) => {
                const isTop = idx === arr.length - 1;
                return (
                  <Bar
                    key={tier}
                    dataKey={tier}
                    stackId="tier"
                    fill={TIER_META[tier].color}
                    onClick={handleBarClick}
                    radius={isTop ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                    className="cursor-pointer"
                  >
                    {data.map((d) => (
                      <Cell
                        key={d.codGRE}
                        stroke={selectedGre === d.codGRE ? CHART_COLORS.primary : "transparent"}
                        strokeWidth={selectedGre === d.codGRE ? 2 : 0}
                      />
                    ))}
                  </Bar>
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {selected ? (
          <DrilldownPanel gre={selected} onClose={() => setSelectedGre(null)} />
        ) : (
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Clique em uma barra para ver os municípios da GRE.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface CoverageTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: CoverageDatum }>;
}

function CoverageTooltip({ active, payload }: CoverageTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold text-foreground">{d.codGRE}</p>
      <p className="mb-2 text-muted-foreground">
        Cobertura: <span className="font-semibold text-foreground">{formatPercent(d.pctComCIN)}</span>
        {" · "}
        {formatNumber(d.estudantes)} estudantes
      </p>
      <ul className="space-y-1">
        {TIER_ORDER.map((tier) => (
          <li key={tier} className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: TIER_META[tier].color }}
                aria-hidden
              />
              {TIER_META[tier].label}
            </span>
            <span className="font-semibold text-foreground tabular-nums">{d[tier]}</span>
          </li>
        ))}
        <li className="mt-1 flex items-center justify-between gap-4 border-t border-border pt-1 text-muted-foreground">
          <span>Total</span>
          <span className="font-semibold text-foreground tabular-nums">{d.totalMunicipios}</span>
        </li>
      </ul>
    </div>
  );
}

interface DrilldownPanelProps {
  gre: CoverageDatum;
  onClose: () => void;
}

function DrilldownPanel({ gre, onClose }: DrilldownPanelProps) {
  const grouped = useMemo(() => {
    const out: Record<CoverageTier, GreCoverageMunicipality[]> = {
      adequado: [],
      atencao: [],
      critico: [],
    };
    for (const m of gre.municipios) out[m.tier].push(m);
    return out;
  }, [gre]);

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/40 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {gre.codGRE} · Cobertura {formatPercent(gre.pctComCIN)}
          </p>
          <p className="text-xs text-muted-foreground">
            {gre.totalMunicipios} municípios · {formatNumber(gre.estudantes)} estudantes
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Fechar painel"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Fechar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {TIER_ORDER.map((tier) => (
          <TierGroup key={tier} tier={tier} items={grouped[tier]} />
        ))}
      </div>
    </div>
  );
}

function TierGroup({ tier, items }: { tier: CoverageTier; items: GreCoverageMunicipality[] }) {
  const meta = TIER_META[tier];
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: meta.color }}
            aria-hidden
          />
          {meta.label}
          <span className="font-normal text-muted-foreground">{meta.rangeLabel}</span>
        </span>
        <span className="text-xs font-semibold text-muted-foreground tabular-nums">
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="py-2 text-center text-[11px] text-muted-foreground">Nenhum município</p>
      ) : (
        <ul className="max-h-56 space-y-1 overflow-y-auto pr-1">
          {items.map((m) => (
            <li
              key={`${tier}-${m.municipio}`}
              className="flex items-center justify-between gap-2 rounded px-1.5 py-1 text-xs hover:bg-muted/60"
            >
              <span className="min-w-0 truncate text-foreground">{m.municipio}</span>
              <span className="shrink-0 font-semibold tabular-nums" style={{ color: meta.color }}>
                {formatPercent(m.pctComCIN)}
              </span>
            </li>
          ))}
        </ul>
      )}
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
