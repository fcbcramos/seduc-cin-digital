import { GraduationCap, Briefcase, Users2 } from "lucide-react";
import {
  IndicatorBlock,
  IndicatorBlockEmpty,
  type IndicatorBlockGre,
} from "./IndicatorBlock";
import {
  getAdministrativoTotals,
  getDocentesTotals,
  getServidorWorstGres,
} from "@/lib/cin-servidores";

const toBlockGres = (
  rows: { codGRE: string; total: number; pctComCIN: number }[],
): IndicatorBlockGre[] =>
  rows.map((r) => ({ codGRE: r.codGRE, total: r.total, pctComCIN: r.pctComCIN }));

export function SecondaryIndicators() {
  const docentes = getDocentesTotals();
  const admin = getAdministrativoTotals();
  const docentesWorst = toBlockGres(getServidorWorstGres(3, "Professor"));
  const adminWorst = toBlockGres(getServidorWorstGres(3, "Administrativo"));

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <IndicatorBlock
        icon={GraduationCap}
        eyebrow="Docentes"
        title="Docentes em sala de aula"
        description="Professores em regência — base oficial SEDUC-PI"
        total={docentes.total}
        comCIN={docentes.comCIN}
        semCIN={docentes.semCIN}
        pctComCIN={docentes.pctComCIN}
        worstGres={docentesWorst}
        accent="primary"
      />
      <IndicatorBlock
        icon={Briefcase}
        eyebrow="Servidores"
        title="Quadro administrativo"
        description="Servidores não-docentes da rede estadual"
        total={admin.total}
        comCIN={admin.comCIN}
        semCIN={admin.semCIN}
        pctComCIN={admin.pctComCIN}
        worstGres={adminWorst}
        accent="accent"
      />
      <IndicatorBlockEmpty
        icon={Users2}
        eyebrow="Responsáveis"
        title="Pais e responsáveis"
        description="Famílias dos estudantes da rede"
        pendingNote="Indicador previsto na hierarquia oficial. Aguardando integração com a base de matrícula para consolidar total na rede, com CIN e sem CIN, por GRE e por município."
      />
    </div>
  );
}
