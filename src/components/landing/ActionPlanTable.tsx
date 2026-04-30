import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyDataNotice } from "./EmptyDataNotice";

export function ActionPlanTable() {
  const cols = [
    "Ação",
    "Descrição",
    "Responsável",
    "Área",
    "Prazo",
    "Status",
    "Prioridade",
    "Observações",
  ];

  return (
    <div className="space-y-4">
      <EmptyDataNotice message="Plano de ação operacional aguardando dados — estrutura da tabela já preparada conforme padrão SEDUC-PI." />
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <caption className="sr-only">Plano de ação operacional do projeto CIN</caption>
              <TableHeader>
                <TableRow>
                  {cols.map((c) => (
                    <TableHead key={c} scope="col">
                      {c}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={cols.length}
                    className="py-12 text-center text-sm text-muted-foreground"
                  >
                    Nenhuma ação cadastrada — aguardando dados de gestão do projeto.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
