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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { getAllMunicipalities, getByGre } from "@/lib/cin-data";
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

export function MunicipalityTable() {
  const all = useMemo(() => getAllMunicipalities(), []);
  const gres = useMemo(() => getByGre().map((g) => g.codGRE), []);

  const [search, setSearch] = useState("");
  const [gre, setGre] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return all
      .filter((r) => (gre === "all" ? true : r.codGRE === gre))
      .filter((r) =>
        status === "all" ? true : getCoverageStatus(r.pctEstudantes) === status,
      )
      .filter((r) => (term ? r.municipio.toLowerCase().includes(term) : true))
      .sort((a, b) => b.gapTotal - a.gapTotal);
  }, [all, gre, status, search]);

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
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
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
              <SelectTrigger className="sm:w-44" aria-label="Filtrar por GRE">
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
              <SelectTrigger className="sm:w-44" aria-label="Filtrar por status">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="success">Adequado (≥70%)</SelectItem>
                <SelectItem value="warning">Atenção (40–69%)</SelectItem>
                <SelectItem value="danger">Crítico (&lt;40%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            {filtered.length} municípios · ordenados por gap total (desc.)
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <caption className="sr-only">
              Cobertura de CIN por município, ordenada por gap total
            </caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">GRE</TableHead>
                <TableHead scope="col">Município</TableHead>
                <TableHead scope="col" className="text-right">Estudantes</TableHead>
                <TableHead scope="col" className="text-right">% c/ CIN</TableHead>
                <TableHead scope="col" className="text-right">Parentes</TableHead>
                <TableHead scope="col" className="text-right">% c/ CIN</TableHead>
                <TableHead scope="col" className="text-right">Gap total</TableHead>
                <TableHead scope="col">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((r) => {
                const s = getCoverageStatus(r.pctEstudantes);
                return (
                  <TableRow key={`${r.codGRE}-${r.municipio}`}>
                    <TableCell className="font-medium text-muted-foreground">
                      {r.codGRE}
                    </TableCell>
                    <TableCell className="font-medium">{r.municipio}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(r.qtdEstudantes)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPercent(r.pctEstudantes)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(r.qtdParentes)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPercent(r.pctParentes)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-semibold">
                      {formatNumber(r.gapTotal)}
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
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    Nenhum município encontrado com os filtros atuais.
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
