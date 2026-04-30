import { GraduationCap, Briefcase, Users2 } from "lucide-react";
import { IndicatorBlock, type IndicatorBlockGre } from "./IndicatorBlock";
import {
  getAdministrativoTotals,
  getDocentesTotals,
  getServidorWorstGres,
} from "@/lib/cin-servidores";
import { getParentTotals, getParentWorstGres } from "@/lib/cin-data";

const toBlockGres = (
  rows: { codGRE: string; total: number; pctComCIN: number }[],
): IndicatorBlockGre[] =>
  rows.map((r) => ({ codGRE: r.codGRE, total: r.total, pctComCIN: r.pctComCIN }));

export function SecondaryIndicators() {
  const docentes = getDocentesTotals();
  const admin = getAdministrativoTotals();
  const parents = getParentTotals();
  const docentesWorst = toBlockGres(getServidorWorstGres(3, "Professor"));
  const adminWorst = toBlockGres(getServidorWorstGres(3, "Administrativo"));
  const parentsWorst = toBlockGres(getParentWorstGres(3));

  return (
    <div className="grid-cards-3">
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
      <IndicatorBlock
        icon={Users2}
        eyebrow="Responsáveis"
        title="Pais e responsáveis"
        description="Famílias dos estudantes da rede — base de matrícula 2026"
        total={parents.total}
        comCIN={parents.comCIN}
        semCIN={parents.semCIN}
        pctComCIN={parents.pctComCIN}
        worstGres={parentsWorst}
        accent="secondary"
      />
    </div>
  );
}
