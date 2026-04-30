import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { EmptyDataNotice } from "./EmptyDataNotice";

const slots = [1, 2, 3, 4];

export function RisksGrid() {
  return (
    <div className="space-y-4">
      <EmptyDataNotice message="Matriz de riscos aguardando alimentação — estrutura preparada para descrição, severidade, mitigação e responsável." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {slots.map((n) => (
          <Card key={n} className="card-hover border-l-4 border-l-secondary shadow-card">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20">
                    <AlertTriangle className="h-4 w-4 text-foreground" aria-hidden />
                  </div>
                  <h3 className="text-sm font-semibold italic text-muted-foreground">
                    Risco a identificar
                  </h3>
                </div>
                <Badge variant="outline" className="status-warning text-[10px]">
                  Severidade —
                </Badge>
              </div>
              <dl className="space-y-1.5 text-xs text-muted-foreground">
                <div>
                  <dt className="inline font-medium text-foreground/70">Mitigação: </dt>
                  <dd className="inline italic">A definir</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground/70">Responsável: </dt>
                  <dd className="inline italic">A definir</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
