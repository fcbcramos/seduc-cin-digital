import rawData from "@/data/cin-coverage.json";

export interface MunicipioCIN {
  codGRE: string;
  municipio: string;
  qtdEstudantes: number;
  qtdEstudanteComCIN: number;
  qtdEstudanteSemCIN: number;
  qtdParentes: number;
  qtdParenteComCIN: number;
  qtdParenteSemCIN: number;
}

export interface Totals {
  estudantes: number;
  estudantesComCIN: number;
  estudantesSemCIN: number;
  parentes: number;
  parentesComCIN: number;
  parentesSemCIN: number;
  pctEstudantes: number;
  pctParentes: number;
  pctGeral: number;
  totalMunicipios: number;
  totalGREs: number;
}

export interface GreAggregate {
  codGRE: string;
  municipios: number;
  estudantes: number;
  estudantesComCIN: number;
  parentes: number;
  parentesComCIN: number;
  pctEstudantes: number;
  pctParentes: number;
  gapEstudantes: number;
  gapParentes: number;
}

export interface MunicipalityRow extends MunicipioCIN {
  pctEstudantes: number;
  pctParentes: number;
  gapTotal: number;
}

const data = rawData as MunicipioCIN[];

const safePct = (part: number, total: number): number =>
  total === 0 ? 0 : (part / total) * 100;

export const getAllMunicipalities = (): MunicipalityRow[] =>
  data.map((row) => ({
    ...row,
    pctEstudantes: safePct(row.qtdEstudanteComCIN, row.qtdEstudantes),
    pctParentes: safePct(row.qtdParenteComCIN, row.qtdParentes),
    gapTotal: row.qtdEstudanteSemCIN + row.qtdParenteSemCIN,
  }));

export const getTotals = (): Totals => {
  const estudantes = data.reduce((acc, r) => acc + r.qtdEstudantes, 0);
  const estudantesComCIN = data.reduce((acc, r) => acc + r.qtdEstudanteComCIN, 0);
  const estudantesSemCIN = data.reduce((acc, r) => acc + r.qtdEstudanteSemCIN, 0);
  const parentes = data.reduce((acc, r) => acc + r.qtdParentes, 0);
  const parentesComCIN = data.reduce((acc, r) => acc + r.qtdParenteComCIN, 0);
  const parentesSemCIN = data.reduce((acc, r) => acc + r.qtdParenteSemCIN, 0);
  const total = estudantes + parentes;
  const totalCom = estudantesComCIN + parentesComCIN;
  const gres = new Set(data.map((r) => r.codGRE));

  return {
    estudantes,
    estudantesComCIN,
    estudantesSemCIN,
    parentes,
    parentesComCIN,
    parentesSemCIN,
    pctEstudantes: safePct(estudantesComCIN, estudantes),
    pctParentes: safePct(parentesComCIN, parentes),
    pctGeral: safePct(totalCom, total),
    totalMunicipios: data.length,
    totalGREs: gres.size,
  };
};

export const getByGre = (): GreAggregate[] => {
  const map = new Map<string, GreAggregate>();
  for (const r of data) {
    const cur = map.get(r.codGRE) ?? {
      codGRE: r.codGRE,
      municipios: 0,
      estudantes: 0,
      estudantesComCIN: 0,
      parentes: 0,
      parentesComCIN: 0,
      pctEstudantes: 0,
      pctParentes: 0,
      gapEstudantes: 0,
      gapParentes: 0,
    };
    cur.municipios += 1;
    cur.estudantes += r.qtdEstudantes;
    cur.estudantesComCIN += r.qtdEstudanteComCIN;
    cur.parentes += r.qtdParentes;
    cur.parentesComCIN += r.qtdParenteComCIN;
    cur.gapEstudantes += r.qtdEstudanteSemCIN;
    cur.gapParentes += r.qtdParenteSemCIN;
    map.set(r.codGRE, cur);
  }
  return [...map.values()]
    .map((g) => ({
      ...g,
      pctEstudantes: safePct(g.estudantesComCIN, g.estudantes),
      pctParentes: safePct(g.parentesComCIN, g.parentes),
    }))
    .sort((a, b) => a.codGRE.localeCompare(b.codGRE));
};

export const getTopGapMunicipalities = (limit = 10): MunicipalityRow[] =>
  [...getAllMunicipalities()].sort((a, b) => b.gapTotal - a.gapTotal).slice(0, limit);
