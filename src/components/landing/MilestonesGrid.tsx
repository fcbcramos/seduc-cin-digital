import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";
import { EmptyDataNotice } from "./EmptyDataNotice";

const slots = Array.from({ length: 6 }, (_, i) => i + 1);

export function MilestonesGrid() {
  return (
    <div className="space-y-4">
      <EmptyDataNotice message="Marcos e entregáveis aguardando alimentação — slots prontos para receber data, descrição, responsável e status." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((n) => (
          <Card key={n} className="card-hover shadow-card">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20">
                  <Flag className="h-4 w-4 text-foreground" aria-hidden />
                </div>
                <Badge variant="outline" className="status-info text-[10px]">
                  Marco {n}
                </Badge>
              </div>
              <div className="space-y-1.5 text-sm">
                <p className="font-semibold text-foreground italic text-muted-foreground">
                  Marco a definir
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">Data:</span>{" "}
                  <span className="italic">—</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">Responsável:</span>{" "}
                  <span className="italic">—</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
