import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  Users,
  UsersRound,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone: "primary" | "success" | "warning" | "danger";
  progress?: number;
}

const toneStyles: Record<KpiCardProps["tone"], { iconBg: string; iconColor: string }> = {
  primary: { iconBg: "bg-primary/10", iconColor: "text-primary" },
  success: { iconBg: "bg-accent/10", iconColor: "text-accent" },
  warning: { iconBg: "bg-secondary/20", iconColor: "text-foreground" },
  danger: { iconBg: "bg-destructive/10", iconColor: "text-destructive" },
};

function KpiCard({ label, value, helper, icon: Icon, tone, progress }: KpiCardProps) {
  const t = toneStyles[tone];
  return (
    <Card className="card-hover shadow-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{value}</p>
            {helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}
          </div>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${t.iconBg}`}
          >
            <Icon className={`h-5 w-5 ${t.iconColor}`} aria-hidden />
          </div>
        </div>
        {typeof progress === "number" && (
          <div className="mt-4">
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function KpiSummary() {
  const t = getTotals();

  const items: KpiCardProps[] = [
    {
      label: "Total de estudantes",
      value: formatNumber(t.estudantes),
      helper: "Rede estadual de ensino do Piauí",
      icon: GraduationCap,
      tone: "primary",
    },
    {
      label: "Estudantes com CIN",
      value: formatNumber(t.estudantesComCIN),
      helper: formatPercent(t.pctEstudantes) + " de cobertura",
      icon: CheckCircle2,
      tone: "success",
      progress: t.pctEstudantes,
    },
    {
      label: "Estudantes sem CIN",
      value: formatNumber(t.estudantesSemCIN),
      helper: "Público prioritário do projeto",
      icon: XCircle,
      tone: "danger",
    },
    {
      label: "Total de parentes",
      value: formatNumber(t.parentes),
      helper: "Familiares vinculados aos estudantes",
      icon: UsersRound,
      tone: "primary",
    },
    {
      label: "Parentes sem CIN",
      value: formatNumber(t.parentesSemCIN),
      helper: formatPercent(100 - t.pctParentes) + " do total de familiares",
      icon: Users,
      tone: "warning",
    },
    {
      label: "Avanço geral",
      value: formatPercent(t.pctGeral),
      helper: "Cobertura consolidada (estudantes + parentes)",
      icon: TrendingUp,
      tone: "success",
      progress: t.pctGeral,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <KpiCard key={item.label} {...item} />
      ))}
    </div>
  );
}
