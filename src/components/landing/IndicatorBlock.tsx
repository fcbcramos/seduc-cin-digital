import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";
import { formatNumber, formatPercent } from "@/lib/format";

export interface IndicatorBlockGre {
  codGRE: string;
  total: number;
  pctComCIN: number;
}

export interface IndicatorBlockProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
  worstGres?: IndicatorBlockGre[];
  accent: "primary" | "accent" | "secondary";
}

const accentMap: Record<
  IndicatorBlockProps["accent"],
  { bar: string; iconBg: string; iconColor: string; progress: string }
> = {
  primary: {
    bar: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    progress: "bg-primary",
  },
  accent: {
    bar: "bg-accent",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    progress: "bg-accent",
  },
  secondary: {
    bar: "bg-secondary",
    iconBg: "bg-secondary/20",
    iconColor: "text-foreground",
    progress: "bg-secondary",
  },
};

export function IndicatorBlock({
  icon: Icon,
  eyebrow,
  title,
  description,
  total,
  comCIN,
  semCIN,
  pctComCIN,
  worstGres,
  accent,
}: IndicatorBlockProps) {
  const a = accentMap[accent];
  return (
    <Card className="card-hover relative flex h-full flex-col overflow-hidden shadow-card">
      <span className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} aria-hidden />
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <header className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${a.iconBg} ${a.iconColor}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-2 border-y border-border/60 py-3 text-center">
          <Stat label="Total" value={formatNumber(total)} />
          <Stat label="Com CIN" value={formatNumber(comCIN)} tone={a.iconColor} />
          <Stat label="Sem CIN" value={formatNumber(semCIN)} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wide text-muted-foreground">
              Cobertura
            </span>
            <span className="text-sm font-bold tabular-nums text-foreground">
              {formatPercent(pctComCIN)}
            </span>
          </div>
          <Progress
            value={pctComCIN}
            indicatorClassName={a.progress}
            className="h-2.5"
            aria-label={`${title}: ${formatPercent(pctComCIN)} de cobertura`}
          />
        </div>

        {worstGres && worstGres.length > 0 && (
          <div className="mt-auto">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              GREs prioritárias
            </p>
            <ol className="space-y-1.5">
              {worstGres.map((g, idx) => (
                <li
                  key={g.codGRE}
                  className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-2.5 py-1.5 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-card text-[10px] font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <span className="truncate font-semibold text-foreground">
                      {g.codGRE}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground tabular-nums">
                      {formatNumber(g.total)}
                    </span>
                  </span>
                  <Badge
                    variant="outline"
                    className="status-warning shrink-0 tabular-nums text-[10px] font-bold"
                  >
                    {formatPercent(g.pctComCIN)}
                  </Badge>
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface IndicatorBlockEmptyProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  pendingNote: string;
  accent?: "secondary" | "muted";
}

export function IndicatorBlockEmpty({
  icon: Icon,
  eyebrow,
  title,
  description,
  pendingNote,
  accent = "secondary",
}: IndicatorBlockEmptyProps) {
  const isSecondary = accent === "secondary";
  const bar = isSecondary ? "bg-secondary" : "bg-muted-foreground/30";
  const iconWrap = isSecondary
    ? "bg-secondary/20 text-foreground"
    : "bg-muted text-muted-foreground";
  const noteWrap = isSecondary
    ? "border-secondary/40 bg-secondary/10"
    : "border-border/80 bg-muted/30";
  const badgeClass = isSecondary
    ? "border-secondary/50 bg-secondary/20 text-secondary-foreground"
    : "";

  return (
    <Card className="relative flex h-full flex-col overflow-hidden border-dashed shadow-card">
      <span className={`absolute inset-x-0 top-0 h-1 ${bar}`} aria-hidden />
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <header className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconWrap}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </p>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </header>

        <div
          className={`flex flex-1 flex-col items-start justify-center gap-3 rounded-lg border border-dashed p-5 ${noteWrap}`}
        >
          <Badge
            variant="outline"
            className={`text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}
          >
            Em consolidação
          </Badge>
          <p className="text-xs leading-relaxed text-muted-foreground">{pendingNote}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  tone = "text-foreground",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 text-base font-extrabold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}
