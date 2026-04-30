import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Building2, Sparkles } from "lucide-react";
import { getStudentTotals } from "@/lib/cin-data";
import { formatNumber, formatPercent } from "@/lib/format";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=80";

export function Hero() {
  const t = getStudentTotals();

  return (
    <header className="relative overflow-hidden bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        {/* LEFT — content */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge className="border-0 bg-secondary text-secondary-foreground hover:bg-secondary">
              <Sparkles className="mr-1.5 h-3 w-3" aria-hidden />
              Projeto Institucional
            </Badge>
            <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
              <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
              Em execução
            </Badge>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Projeto{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              CIN nas Escolas
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A Secretaria de Estado da Educação do Piauí mobiliza a rede para garantir
            que <strong className="text-foreground">todos os estudantes</strong> da
            educação básica obtenham a Carteira de Identidade Nacional, eliminando a
            subidentificação documental no estado.
          </p>

          {/* micro KPIs */}
          <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KpiPill icon={GraduationCap} label="Estudantes" value={formatNumber(t.estudantes)} tone="primary" />
            <KpiPill icon={Sparkles} label="Cobertura" value={formatPercent(t.pctComCIN, 1)} tone="accent" />
            <KpiPill icon={MapPin} label="Municípios" value={formatNumber(t.totalMunicipios)} tone="secondary" />
            <KpiPill icon={Building2} label="GREs" value={formatNumber(t.totalGREs)} tone="muted" />
          </dl>
        </div>

        {/* RIGHT — imagery */}
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl shadow-card-hover">
            <img
              src={HERO_IMAGE}
              alt="Estudantes da rede pública em sala de aula"
              className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[460px]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-primary/20 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Identidade · Cidadania · Educação
              </p>
              <p className="mt-1 text-lg font-bold leading-snug sm:text-xl">
                Cada estudante com sua identidade garantida.
              </p>
            </div>
          </div>

          {/* floating stat card */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-4 shadow-card-hover sm:block lg:-left-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Faltam atender
            </p>
            <p className="mt-1 text-3xl font-bold text-destructive">
              {formatNumber(t.semCIN)}
            </p>
            <p className="text-xs text-muted-foreground">estudantes sem CIN</p>
          </div>
        </div>
      </div>

      <div className="gradient-institutional h-1.5 w-full" aria-hidden />
    </header>
  );
}

interface KpiPillProps {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  tone: "primary" | "accent" | "secondary" | "muted";
}

const toneBg: Record<KpiPillProps["tone"], string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/20 text-foreground",
  muted: "bg-muted text-muted-foreground",
};

function KpiPill({ icon: Icon, label, value, tone }: KpiPillProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${toneBg[tone]}`}>
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-bold text-foreground sm:text-xl">{value}</p>
    </div>
  );
}
