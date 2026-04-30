import { Card, CardContent } from "@/components/ui/card";
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
  accent?: "primary" | "accent" | "secondary";
}

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
}: IndicatorBlockProps) {
  return (
    <Card className="flex h-full flex-col border border-border bg-card shadow-card">
      <CardContent className="flex flex-1 flex-col gap-5 p-6">
        <header className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
            <Icon className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="eyebrow">{eyebrow}</p>
            <h3 className="mt-1 font-display text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-2 border-y border-border py-4 text-center">
          <Stat label="Total" value={formatNumber(total)} />
          <Stat label="Com CIN" value={formatNumber(comCIN)} />
          <Stat label="Sem CIN" value={formatNumber(semCIN)} tone="text-critical" />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="eyebrow">Cobertura</span>
            <span className="font-display text-base font-semibold tabular-nums text-foreground">
              {formatPercent(pctComCIN)}
            </span>
          </div>
          <Progress value={pctComCIN} indicatorClassName="bg-primary" className="h-1.5" />
        </div>

        {worstGres && worstGres.length > 0 && (
          <div className="mt-auto">
            <p className="eyebrow mb-2">GREs prioritárias</p>
            <ol className="space-y-1">
              {worstGres.map((g, idx) => (
                <li
                  key={g.codGRE}
                  className="flex items-center justify-between gap-2 border-t border-border py-2 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-medium text-foreground">
                      {g.codGRE}
                    </span>
                    <span className="truncate text-muted-foreground tabular-nums">
                      {formatNumber(g.total)}
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-foreground">
                    {formatPercent(g.pctComCIN)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
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
      <p className="eyebrow">{label}</p>
      <p className={`mt-1 font-display text-lg font-semibold tabular-nums ${tone}`}>
        {value}
      </p>
    </div>
  );
}
