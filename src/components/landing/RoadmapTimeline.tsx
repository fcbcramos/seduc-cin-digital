import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyDataNotice } from "./EmptyDataNotice";

const phases = [
  { key: 1, name: "Diagnóstico" },
  { key: 2, name: "Planejamento" },
  { key: 3, name: "Mobilização" },
  { key: 4, name: "Execução" },
  { key: 5, name: "Consolidação" },
];

export function RoadmapTimeline() {
  return (
    <div>
      <div className="mb-4">
        <EmptyDataNotice message="Roadmap aguardando alimentação — nomes de fase exibidos abaixo são estrutura sugerida, prazos e entregas serão preenchidos com a planilha de gestão." />
      </div>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {phases.map((p, idx) => (
          <li key={p.key}>
            <Card className="card-hover h-full shadow-card">
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {p.key}
                  </span>
                  <Badge variant="outline" className="status-info text-[10px]">
                    Fase {p.key}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p><span className="font-medium text-foreground/70">Período:</span> <span className="italic">A definir</span></p>
                  <p><span className="font-medium text-foreground/70">Entregas:</span> <span className="italic">A definir</span></p>
                  <p><span className="font-medium text-foreground/70">Status:</span> <span className="italic">A definir</span></p>
                </div>
                <div className="mt-auto h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-border"
                    style={{ width: `${(idx + 1) * 12}%` }}
                    aria-hidden
                  />
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
