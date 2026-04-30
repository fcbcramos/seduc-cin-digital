import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, GraduationCap, ShieldCheck, UserMinus, Users } from "lucide-react";
import {
  getServidorByTipo,
  getServidorTotals,
  getServidorWorstGres,
} from "@/lib/cin-servidores";
import { formatNumber, formatPercent } from "@/lib/format";

export function StaffAdoption() {
  const totals = getServidorTotals();
  const byTipo = getServidorByTipo();
  const worst = getServidorWorstGres(5);

  const professor = byTipo.find((t) => t.tipo === "Professor");
  const admin = byTipo.find((t) => t.tipo === "Administrativo");

  return (
    <div className="space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiTile
          icon={<Users className="h-4 w-4" aria-hidden />}
          label="Servidores"
          value={formatNumber(totals.total)}
          hint={`${totals.totalGREs} GREs · ${totals.totalMunicipios} municípios`}
          tone="primary"
        />
        <KpiTile
          icon={<ShieldCheck className="h-4 w-4" aria-hidden />}
          label="Com CIN"
          value={formatPercent(totals.pctComCIN)}
          hint={`${formatNumber(totals.comCIN)} servidores regularizados`}
          tone="accent"
        />
        <KpiTile
          icon={<UserMinus className="h-4 w-4" aria-hidden />}
          label="Sem CIN"
          value={formatNumber(totals.semCIN)}
          hint={`${formatPercent(totals.pctSemCIN)} do quadro funcional`}
          tone="destructive"
        />
      </div>

      {/* Categoria + Worst GREs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Cobertura por categoria */}
        <Card className="shadow-card lg:col-span-3">
          <CardContent className="p-6">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-foreground">
                Cobertura por categoria funcional
              </h3>
              <p className="text-xs text-muted-foreground">
                Comparativo Professores vs Administrativo — base oficial SEDUC-PI
              </p>
            </div>
            <div className="space-y-5">
              {professor && (
                <CategoryRow
                  icon={<GraduationCap className="h-4 w-4 text-primary" aria-hidden />}
                  label="Professores"
                  pct={professor.pctComCIN}
                  total={professor.total}
                  comCIN={professor.comCIN}
                  semCIN={professor.semCIN}
                  indicatorClassName="bg-primary"
                />
              )}
              {admin && (
                <CategoryRow
                  icon={<Briefcase className="h-4 w-4 text-accent" aria-hidden />}
                  label="Administrativo"
                  pct={admin.pctComCIN}
                  total={admin.total}
                  comCIN={admin.comCIN}
                  semCIN={admin.semCIN}
                  indicatorClassName="bg-accent"
                />
              )}
            </div>

            <p className="mt-6 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">Indicador indireto:</strong>{" "}
              a alta adesão dos servidores demonstra que a própria rede está alinhada à
              política nacional de identificação — base de credibilidade para a campanha
              junto aos estudantes.
            </p>
          </CardContent>
        </Card>

        {/* Worst GREs entre servidores */}
        <Card className="shadow-card lg:col-span-2 border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">
                GREs com menor adesão
              </h3>
              <p className="text-xs text-muted-foreground">
                Servidores ainda sem CIN — apoio à priorização
              </p>
            </div>
            <ol className="space-y-2.5">
              {worst.map((g, idx) => (
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
                      <p className="text-[11px] text-muted-foreground tabular-nums">
                        {formatNumber(g.total)} servidores · {formatNumber(g.semCIN)} sem CIN
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="status-warning shrink-0 tabular-nums text-[11px] font-bold"
                  >
                    {formatPercent(g.pctComCIN)}
                  </Badge>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface KpiTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone: "primary" | "accent" | "destructive";
}

function KpiTile({ icon, label, value, hint, tone }: KpiTileProps) {
  const toneMap: Record<KpiTileProps["tone"], { bg: string; text: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    accent: { bg: "bg-accent/10", text: "text-accent" },
    destructive: { bg: "bg-destructive/10", text: "text-destructive" },
  };
  const t = toneMap[tone];
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-start gap-3 p-5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.bg} ${t.text}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className={`mt-0.5 text-2xl font-extrabold tabular-nums ${t.text}`}>
            {value}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface CategoryRowProps {
  icon: React.ReactNode;
  label: string;
  pct: number;
  total: number;
  comCIN: number;
  semCIN: number;
  indicatorClassName: string;
}

function CategoryRow({
  icon,
  label,
  pct,
  total,
  comCIN,
  semCIN,
  indicatorClassName,
}: CategoryRowProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          {icon}
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums text-foreground">
          {formatPercent(pct)}
        </span>
      </div>
      <Progress value={pct} indicatorClassName={indicatorClassName} className="h-2.5" />
      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground tabular-nums">
        <span>
          Total: <strong className="font-semibold text-foreground">{formatNumber(total)}</strong>
        </span>
        <span>
          Com CIN: <strong className="font-semibold text-foreground">{formatNumber(comCIN)}</strong>
        </span>
        <span>
          Sem CIN: <strong className="font-semibold text-foreground">{formatNumber(semCIN)}</strong>
        </span>
      </div>
    </div>
  );
}
