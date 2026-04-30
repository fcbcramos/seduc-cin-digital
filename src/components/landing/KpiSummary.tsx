import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  IdCard,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  accent: "primary" | "accent" | "destructive" | "secondary";
}

const accentRing: Record<KpiCardProps["accent"], string> = {
  primary: "border-l-primary",
  accent: "border-l-accent",
  destructive: "border-l-destructive",
  secondary: "border-l-secondary",
};

const accentIcon: Record<KpiCardProps["accent"], string> = {
  primary: "text-primary bg-primary/10",
  accent: "text-accent bg-accent/10",
  destructive: "text-destructive bg-destructive/10",
  secondary: "text-foreground bg-secondary/20",
};

function KpiCard({ icon: Icon, label, value, hint, accent }: KpiCardProps) {
  return (
    <Card className={`flex h-full flex-col border-l-4 ${accentRing[accent]} shadow-card`}>
      <CardContent className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow leading-tight">{label}</span>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${accentIcon[accent]}`}>
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <p className="text-2xl font-bold tabular-nums leading-tight text-foreground">
          {value}
        </p>
        {hint && (
          <p className="mt-auto text-xs leading-snug text-muted-foreground">{hint}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function KpiSummary() {
  const t = getStudentTotals();

  return (
    <div className="grid-kpis-6">
      <KpiCard
        icon={GraduationCap}
        label="Total de estudantes"
        value={formatNumber(t.estudantes)}
        hint="Rede estadual · base 2026"
        accent="primary"
      />
      <KpiCard
        icon={IdCard}
        label="Com CIN"
        value={formatNumber(t.comCIN)}
        hint={`${formatPercent(t.pctComCIN)} de cobertura`}
        accent="accent"
      />
      <KpiCard
        icon={AlertTriangle}
        label="Sem CIN"
        value={formatNumber(t.semCIN)}
        hint={`${formatPercent(t.pctSemCIN)} a documentar`}
        accent="destructive"
      />
      <KpiCard
        icon={TrendingUp}
        label="Cobertura geral"
        value={formatPercent(t.pctComCIN)}
        hint="Meta 100% até dez/2026"
        accent="primary"
      />
      <KpiCard
        icon={Building2}
        label="GREs envolvidas"
        value={String(t.totalGREs)}
        hint="21 gerências regionais"
        accent="secondary"
      />
      <KpiCard
        icon={MapPin}
        label="Municípios"
        value={String(t.totalMunicipios)}
        hint="Rede estadual atendida"
        accent="secondary"
      />
    </div>
  );
}
