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

export interface StudentTotals {
  estudantes: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
  pctSemCIN: number;
  totalMunicipios: number;
  totalGREs: number;
  municipiosCriticos: number; // <40%
  municipiosAdequados: number; // >=70%
}

export interface GreStudentAggregate {
  codGRE: string;
  municipios: number;
  estudantes: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

export interface MunicipalityStudentRow {
  codGRE: string;
  municipio: string;
  estudantes: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

export interface ParentTotals {
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
  pctSemCIN: number;
}

export interface ParentByGre {
  codGRE: string;
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

const data = rawData as MunicipioCIN[];

const safePct = (part: number, total: number): number =>
  total === 0 ? 0 : (part / total) * 100;

export const getParentTotals = (): ParentTotals => {
  const total = data.reduce((a, r) => a + r.qtdParentes, 0);
  const comCIN = data.reduce((a, r) => a + r.qtdParenteComCIN, 0);
  const semCIN = data.reduce((a, r) => a + r.qtdParenteSemCIN, 0);
  return {
    total,
    comCIN,
    semCIN,
    pctComCIN: safePct(comCIN, total),
    pctSemCIN: safePct(semCIN, total),
  };
};

export const getParentByGre = (): ParentByGre[] => {
  const map = new Map<string, ParentByGre>();
  for (const r of data) {
    const cur =
      map.get(r.codGRE) ??
      { codGRE: r.codGRE, total: 0, comCIN: 0, semCIN: 0, pctComCIN: 0 };
    cur.total += r.qtdParentes;
    cur.comCIN += r.qtdParenteComCIN;
    cur.semCIN += r.qtdParenteSemCIN;
    map.set(r.codGRE, cur);
  }
  return [...map.values()]
    .map((g) => ({ ...g, pctComCIN: safePct(g.comCIN, g.total) }))
    .sort((a, b) => a.pctComCIN - b.pctComCIN);
};

export const getParentWorstGres = (n = 3): ParentByGre[] =>
  getParentByGre().slice(0, n);

/**
 * Nota: Teresina aparece em 4 GREs distintas (04ª, 19ª, 20ª e 21ª) por desenho
 * administrativo da SEDUC-PI — cada GRE gerencia uma fatia das escolas da
 * capital. Por isso `data.length` (227) ≠ municípios únicos (224). Sempre
 * usar Set por nome para contar municípios; agrupar por nome quando a view
 * for "por município"; manter fatiado quando a view for "por GRE".
 */
export const getStudentTotals = (): StudentTotals => {
  const estudantes = data.reduce((acc, r) => acc + r.qtdEstudantes, 0);
  const comCIN = data.reduce((acc, r) => acc + r.qtdEstudanteComCIN, 0);
  const semCIN = data.reduce((acc, r) => acc + r.qtdEstudanteSemCIN, 0);
  const gres = new Set(data.map((r) => r.codGRE));
  const municipios = new Set(data.map((r) => r.municipio));
  // Avaliar status por município consolidado (Teresina como 1 entrada)
  const consolidated = getStudentMunicipalitiesConsolidated();
  let criticos = 0;
  let adequados = 0;
  for (const r of consolidated) {
    if (r.pctComCIN < 40) criticos += 1;
    else if (r.pctComCIN >= 70) adequados += 1;
  }
  return {
    estudantes,
    comCIN,
    semCIN,
    pctComCIN: safePct(comCIN, estudantes),
    pctSemCIN: safePct(semCIN, estudantes),
    totalMunicipios: municipios.size,
    totalGREs: gres.size,
    municipiosCriticos: criticos,
    municipiosAdequados: adequados,
  };
};

/**
 * Consolida por nome do município (Teresina vira 1 linha somando suas 4 GREs).
 * Use para qualquer ranking ou view "por município".
 */
export const getStudentMunicipalitiesConsolidated = (): MunicipalityStudentRow[] => {
  const map = new Map<string, MunicipalityStudentRow>();
  for (const r of data) {
    const cur = map.get(r.municipio) ?? {
      codGRE: r.codGRE,
      municipio: r.municipio,
      estudantes: 0,
      comCIN: 0,
      semCIN: 0,
      pctComCIN: 0,
    };
    cur.estudantes += r.qtdEstudantes;
    cur.comCIN += r.qtdEstudanteComCIN;
    cur.semCIN += r.qtdEstudanteSemCIN;
    map.set(r.municipio, cur);
  }
  return [...map.values()].map((m) => ({
    ...m,
    pctComCIN: safePct(m.comCIN, m.estudantes),
  }));
};

export const getStudentByGre = (): GreStudentAggregate[] => {
  const map = new Map<string, GreStudentAggregate>();
  for (const r of data) {
    const cur = map.get(r.codGRE) ?? {
      codGRE: r.codGRE,
      municipios: 0,
      estudantes: 0,
      comCIN: 0,
      semCIN: 0,
      pctComCIN: 0,
    };
    cur.municipios += 1;
    cur.estudantes += r.qtdEstudantes;
    cur.comCIN += r.qtdEstudanteComCIN;
    cur.semCIN += r.qtdEstudanteSemCIN;
    map.set(r.codGRE, cur);
  }
  return [...map.values()]
    .map((g) => ({ ...g, pctComCIN: safePct(g.comCIN, g.estudantes) }))
    .sort((a, b) => a.codGRE.localeCompare(b.codGRE));
};

export const getStudentMunicipalities = (): MunicipalityStudentRow[] =>
  data.map((r) => ({
    codGRE: r.codGRE,
    municipio: r.municipio,
    estudantes: r.qtdEstudantes,
    comCIN: r.qtdEstudanteComCIN,
    semCIN: r.qtdEstudanteSemCIN,
    pctComCIN: safePct(r.qtdEstudanteComCIN, r.qtdEstudantes),
  }));

export const getTopBestGres = (limit = 5): GreStudentAggregate[] =>
  [...getStudentByGre()].sort((a, b) => b.pctComCIN - a.pctComCIN).slice(0, limit);

export const getTopWorstGres = (limit = 5): GreStudentAggregate[] =>
  [...getStudentByGre()].sort((a, b) => a.pctComCIN - b.pctComCIN).slice(0, limit);

export const getTopGapMunicipalities = (limit = 10): MunicipalityStudentRow[] =>
  [...getStudentMunicipalitiesConsolidated()].sort((a, b) => b.semCIN - a.semCIN).slice(0, limit);

export type CoverageTier = "adequado" | "atencao" | "critico";

export interface GreCoverageMunicipality {
  municipio: string;
  estudantes: number;
  pctComCIN: number;
  tier: CoverageTier;
}

export interface GreCoverageBreakdown {
  codGRE: string;
  pctComCIN: number;
  estudantes: number;
  totalMunicipios: number;
  adequado: number;
  atencao: number;
  critico: number;
  municipios: GreCoverageMunicipality[];
}

const classifyTier = (pct: number): CoverageTier => {
  if (pct >= 70) return "adequado";
  if (pct >= 40) return "atencao";
  return "critico";
};

export const getCoverageBreakdownByGre = (): GreCoverageBreakdown[] => {
  const map = new Map<string, GreCoverageBreakdown>();
  for (const r of data) {
    const pct = safePct(r.qtdEstudanteComCIN, r.qtdEstudantes);
    const tier = classifyTier(pct);
    const cur =
      map.get(r.codGRE) ??
      {
        codGRE: r.codGRE,
        pctComCIN: 0,
        estudantes: 0,
        totalMunicipios: 0,
        adequado: 0,
        atencao: 0,
        critico: 0,
        municipios: [] as GreCoverageMunicipality[],
      };
    cur.estudantes += r.qtdEstudantes;
    cur.totalMunicipios += 1;
    cur[tier] += 1;
    cur.municipios.push({
      municipio: r.municipio,
      estudantes: r.qtdEstudantes,
      pctComCIN: pct,
      tier,
    });
    map.set(r.codGRE, cur);
  }
  const aggregates = new Map(getStudentByGre().map((g) => [g.codGRE, g.pctComCIN]));
  return [...map.values()]
    .map((g) => ({
      ...g,
      pctComCIN: aggregates.get(g.codGRE) ?? 0,
      municipios: g.municipios.sort((a, b) => b.pctComCIN - a.pctComCIN),
    }))
    .sort((a, b) => parseInt(a.codGRE, 10) - parseInt(b.codGRE, 10));
};
