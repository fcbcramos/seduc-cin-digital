import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { EmptyDataNotice } from "./EmptyDataNotice";

const slots = [1, 2, 3, 4, 5];

export function NextStepsList() {
  return (
    <div className="space-y-4">
      <EmptyDataNotice message="Próximos passos aguardando alimentação — lista numerada pronta para receber encaminhamentos do projeto." />
      <Card className="shadow-card">
        <CardContent className="p-0">
          <ol className="divide-y divide-border">
            {slots.map((n) => (
              <li key={n} className="flex items-center gap-4 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {n}
                </span>
                <p className="flex-1 text-sm italic text-muted-foreground">
                  Encaminhamento {n} a definir
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
