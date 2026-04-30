import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getByGre } from "@/lib/cin-data";
import {
  coverageStatusLabel,
  formatNumber,
  formatPercent,
  getCoverageStatus,
} from "@/lib/format";

const statusVariant: Record<
  ReturnType<typeof getCoverageStatus>,
  "status-success" | "status-warning" | "status-danger"
> = {
  success: "status-success",
  warning: "status-warning",
  danger: "status-danger",
};

export function TerritorialDiagnosis() {
  const gres = getByGre();
  const chartData = gres.map((g) => ({
    name: g.codGRE.replace("ª GRE", "ª"),
    Estudantes: Number(g.pctEstudantes.toFixed(1)),
    Parentes: Number(g.pctParentes.toFixed(1)),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="shadow-card lg:col-span-3">
        <CardContent className="p-5">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Cobertura CIN por Gerência Regional (%)
          </h3>
          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 245)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.02 250)" }}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.02 250)" }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v: number) => `${v.toFixed(1)}%`}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid oklch(0.91 0.01 245)",
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Estudantes" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Parentes" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card lg:col-span-2">
        <CardContent className="p-0">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-base font-semibold text-foreground">
              Ranking por GRE
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Status: ≥70% adequado · 40–69% atenção · &lt;40% crítico
            </p>
          </div>
          <div className="max-h-[420px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead scope="col">GRE</TableHead>
                  <TableHead scope="col" className="text-right">Estud.</TableHead>
                  <TableHead scope="col" className="text-right">% Est.</TableHead>
                  <TableHead scope="col">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gres.map((g) => {
                  const s = getCoverageStatus(g.pctEstudantes);
                  return (
                    <TableRow key={g.codGRE}>
                      <TableCell className="font-medium">{g.codGRE}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatNumber(g.estudantes)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatPercent(g.pctEstudantes)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusVariant[s]}>
                          {coverageStatusLabel[s]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
