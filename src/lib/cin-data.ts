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

const data = rawData as MunicipioCIN[];

const safePct = (part: number, total: number): number =>
  total === 0 ? 0 : (part / total) * 100;

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
