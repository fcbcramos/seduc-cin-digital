import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Banknote, Cpu, PackageCheck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/format";

interface KitItem {
  quantidade: number;
  termoGenerico: string;
  modeloReferencia: string;
  funcao: string;
}

const KIT_ITEMS: KitItem[] = [
  {
    quantidade: 1,
    termoGenerico: "Biombo de atendimento",
    modeloReferencia: "MAKO",
    funcao: "Garante privacidade e organização no atendimento.",
  },
  {
    quantidade: 2,
    termoGenerico: "Estações de trabalho",
    modeloReferencia:
      "Dell Optiplex 3020, monitor LG 19,5” LED e nobreak SMS Station II Bivolt",
    funcao:
      "Uma estação para captura biométrica/fotográfica e outra para apoio operacional.",
  },
  {
    quantidade: 1,
    termoGenerico: "Câmera digital",
    modeloReferencia: "Canon PowerShot SX160",
    funcao: "Realiza a captura fotográfica do usuário.",
  },
  {
    quantidade: 1,
    termoGenerico: "Pad de assinatura biométrica",
    modeloReferencia: "Akiyama AK560",
    funcao: "Coleta a assinatura eletrônica do usuário.",
  },
  {
    quantidade: 1,
    termoGenerico: "Leitor biométrico",
    modeloReferencia: "Suprema RealScan-D",
    funcao: "Realiza a coleta e leitura de impressões digitais.",
  },
];

const TOTAL_KITS = 10;
const VALOR_UNITARIO = 25000;
const INVESTIMENTO_TOTAL = TOTAL_KITS * VALOR_UNITARIO;

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}

function KpiCard({ icon: Icon, label, value, hint }: KpiCardProps) {
  return (
    <Card className="border-l-4 border-l-primary shadow-sm">
      <CardContent className="flex h-full flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {label}
          </span>
        </div>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

export function HardwareKit() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          icon={PackageCheck}
          label="Kits previstos"
          value={formatNumber(TOTAL_KITS)}
          hint="Mobilizados ao longo das 7 ondas do roadmap"
        />
        <KpiCard
          icon={Wallet}
          label="Valor por kit"
          value={formatCurrency(VALOR_UNITARIO)}
          hint="Valor aproximado de aquisição por unidade"
        />
        <KpiCard
          icon={Banknote}
          label="Investimento total"
          value={formatCurrency(INVESTIMENTO_TOTAL)}
          hint="Estimativa para os 10 kits do projeto"
        />
      </div>

      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Composição do kit
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-20 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Qtd.
                  </TableHead>
                  <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Termo genérico
                  </TableHead>
                  <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Modelo de referência
                  </TableHead>
                  <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Função
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {KIT_ITEMS.map((item) => (
                  <TableRow key={item.termoGenerico}>
                    <TableCell className="px-3 py-3 align-top font-mono text-sm tabular-nums text-foreground">
                      {item.quantidade.toString().padStart(2, "0")}
                    </TableCell>
                    <TableCell className="px-3 py-3 align-top text-sm font-medium text-foreground">
                      {item.termoGenerico}
                    </TableCell>
                    <TableCell className="px-3 py-3 align-top text-sm text-muted-foreground">
                      {item.modeloReferencia}
                    </TableCell>
                    <TableCell className="px-3 py-3 align-top text-sm text-muted-foreground">
                      {item.funcao}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
            Kit de captura composto por estrutura de atendimento, duas estações
            de trabalho, câmera digital, pad de assinatura biométrica e leitor
            biométrico. A estação principal é destinada à captura biométrica e
            fotográfica do usuário, enquanto a segunda estação é utilizada para
            apoio operacional, conferência de dados e suporte ao atendimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
