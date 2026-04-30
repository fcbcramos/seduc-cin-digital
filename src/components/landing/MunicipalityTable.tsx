import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getStudentMunicipalitiesConsolidated, getStudentByGre } from "@/lib/cin-data";
import {
  coverageStatusLabel,
  formatNumber,
  formatPercent,
  getCoverageStatus,
} from "@/lib/format";

const PAGE_SIZE = 12;

const statusClass: Record<
  ReturnType<typeof getCoverageStatus>,
  "status-success" | "status-warning" | "status-danger"
> = {
  success: "status-success",
  warning: "status-warning",
  danger: "status-danger",
};

const progressColor = (pct: number): string => {
  if (pct >= 70) return "bg-accent";
  if (pct >= 40) return "bg-secondary";
  return "bg-destructive";
};

export function MunicipalityTable() {
  const all = useMemo(() => getStudentMunicipalitiesConsolidated(), []);
  const gres = useMemo(() => getStudentByGre().map((g) => g.codGRE), []);

  const [search, setSearch] = useState("");
  const [gre, setGre] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<"semCIN" | "pctAsc" | "pctDesc" | "estudantes">(
    "semCIN",
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = all
      .filter((r) => (gre === "all" ? true : r.codGRE === gre))
      .filter((r) =>
        status === "all" ? true : getCoverageStatus(r.pctComCIN) === status,
      )
      .filter((r) => (term ? r.municipio.toLowerCase().includes(term) : true));

    switch (sort) {
      case "semCIN":
        return list.sort((a, b) => b.semCIN - a.semCIN);
      case "pctAsc":
        return list.sort((a, b) => a.pctComCIN - b.pctComCIN);
      case "pctDesc":
        return list.sort((a, b) => b.pctComCIN - a.pctComCIN);
      case "estudantes":
        return list.sort((a, b) => b.estudantes - a.estudantes);
    }
  }, [all, gre, status, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPageAnd = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:flex-wrap md:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              aria-label="Buscar município"
              placeholder="Buscar município..."
              className="pl-9"
              value={search}
              onChange={(e) => resetPageAnd(setSearch)(e.target.value)}
            />
          </div>
          <Select value={gre} onValueChange={resetPageAnd(setGre)}>
            <SelectTrigger className="md:w-44" aria-label="Filtrar por GRE">
              <SelectValue placeholder="Todas as GREs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as GREs</SelectItem>
              {gres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={resetPageAnd(setStatus)}>
            <SelectTrigger className="md:w-44" aria-label="Filtrar por status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="success">Adequado (≥70%)</SelectItem>
              <SelectItem value="warning">Atenção (40–69%)</SelectItem>
              <SelectItem value="danger">Crítico (&lt;40%)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="md:w-52" aria-label="Ordenar">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semCIN">Mais estudantes sem CIN</SelectItem>
              <SelectItem value="pctAsc">Menor cobertura %</SelectItem>
              <SelectItem value="pctDesc">Maior cobertura %</SelectItem>
              <SelectItem value="estudantes">Mais estudantes</SelectItem>
            </SelectContent>
          </Select>
          <p className="ml-auto text-xs text-muted-foreground">
            {filtered.length} municípios
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <caption className="sr-only">
              Cobertura de CIN por município, com filtros e ordenação
            </caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">GRE</TableHead>
                <TableHead scope="col">Município</TableHead>
                <TableHead scope="col" className="text-right">Estudantes</TableHead>
                <TableHead scope="col" className="text-right">Com CIN</TableHead>
                <TableHead scope="col" className="text-right">Sem CIN</TableHead>
                <TableHead scope="col" className="w-[200px]">Cobertura</TableHead>
                <TableHead scope="col">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((r) => {
                const s = getCoverageStatus(r.pctComCIN);
                return (
                  <TableRow key={`${r.codGRE}-${r.municipio}`}>
                    <TableCell className="font-medium text-muted-foreground">
                      {r.codGRE}
                    </TableCell>
                    <TableCell className="font-medium">{r.municipio}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(r.estudantes)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-accent">
                      {formatNumber(r.comCIN)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-destructive">
                      {formatNumber(r.semCIN)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={r.pctComCIN}
                          className="h-1.5 w-full"
                          indicatorClassName={progressColor(r.pctComCIN)}
                        />
                        <span className="w-12 shrink-0 text-right text-xs font-semibold tabular-nums">
                          {formatPercent(r.pctComCIN, 0)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusClass[s]}>
                        {coverageStatusLabel[s]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    Nenhum município encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            Página {safePage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
