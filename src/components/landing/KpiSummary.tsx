import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  GraduationCap,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  accent: "primary" | "accent" | "destructive" | "secondary";
  progress?: number;
}

const accentMap: Record<
  KpiCardProps["accent"],
  { bar: string; iconBg: string; iconColor: string }
> = {
  primary: { bar: "bg-primary", iconBg: "bg-primary/10", iconColor: "text-primary" },
  accent: { bar: "bg-accent", iconBg: "bg-accent/10", iconColor: "text-accent" },
  destructive: {
    bar: "bg-destructive",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  secondary: {
    bar: "bg-secondary",
    iconBg: "bg-secondary/20",
    iconColor: "text-foreground",
  },
};

function KpiCard({ label, value, helper, icon: Icon, accent, progress }: KpiCardProps) {
  const a = accentMap[accent];
  return (
    <Card className="card-hover relative overflow-hidden shadow-card">
      <span className={`absolute inset-x-0 top-0 h-1 ${a.bar}`} aria-hidden />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
            {helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}
          </div>
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.iconBg}`}
          >
            <Icon className={`h-5 w-5 ${a.iconColor}`} aria-hidden />
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
  const t = getStudentTotals();

  const items: KpiCardProps[] = [
    {
      label: "Total de estudantes",
      value: formatNumber(t.estudantes),
      helper: "Rede estadual do Piauí",
      icon: GraduationCap,
      accent: "primary",
    },
    {
      label: "Estudantes com CIN",
      value: formatNumber(t.comCIN),
      helper: formatPercent(t.pctComCIN) + " do total",
      icon: CheckCircle2,
      accent: "accent",
      progress: t.pctComCIN,
    },
    {
      label: "Estudantes sem CIN",
      value: formatNumber(t.semCIN),
      helper: formatPercent(t.pctSemCIN) + " — público prioritário",
      icon: XCircle,
      accent: "destructive",
      progress: t.pctSemCIN,
    },
    {
      label: "Municípios adequados",
      value: formatNumber(t.municipiosAdequados),
      helper: "Cobertura ≥ 70%",
      icon: ShieldCheck,
      accent: "accent",
    },
    {
      label: "Municípios críticos",
      value: formatNumber(t.municipiosCriticos),
      helper: "Cobertura < 40%",
      icon: ShieldAlert,
      accent: "destructive",
    },
    {
      label: "Cobertura geral",
      value: formatPercent(t.pctComCIN),
      helper: "Estudantes com CIN / total",
      icon: MapPin,
      accent: "secondary",
      progress: t.pctComCIN,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <KpiCard key={i.label} {...i} />
      ))}
    </div>
  );
}
