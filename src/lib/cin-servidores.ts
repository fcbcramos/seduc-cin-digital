import rawData from "@/data/cin-servidores.json";

/**
 * Base oficial SEDUC-PI: servidores (docentes em sala de aula + administrativo)
 * com/sem CIN, agrupados por GRE / Município / Tipo.
 *
 * Nota sobre Teresina: a capital aparece em 4 GREs distintas (04ª, 19ª, 20ª e
 * 21ª) por desenho administrativo da SEDUC — cada GRE gerencia uma fatia das
 * escolas da cidade. Por isso pares (GRE, Município) somam 227, mas municípios
 * únicos são 224. Sempre contar municípios via Set por nome; consolidar
 * Teresina nas views "por município"; manter fatiada nas views "por GRE".
 */

export type ServidorTipo = "Professor" | "Administrativo";

export interface ServidorRow {
  codGRE: string;
  municipio: string;
  tipo: ServidorTipo;
  total: number;
  comCIN: number;
  semCIN: number;
}

export interface ServidorTotals {
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
  pctSemCIN: number;
  totalGREs: number;
  totalMunicipios: number;
}

export interface ServidorByTipo {
  tipo: ServidorTipo;
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

export interface ServidorByGre {
  codGRE: string;
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

export interface ServidorByMunicipio {
  municipio: string;
  total: number;
  comCIN: number;
  semCIN: number;
  pctComCIN: number;
}

const data = rawData as ServidorRow[];

const safePct = (part: number, total: number): number =>
  total === 0 ? 0 : (part / total) * 100;

const sumByTipo = (tipo: ServidorTipo) =>
  data.filter((r) => r.tipo === tipo);

export const getServidorTotals = (): ServidorTotals => {
  const total = data.reduce((acc, r) => acc + r.total, 0);
  const comCIN = data.reduce((acc, r) => acc + r.comCIN, 0);
  const semCIN = data.reduce((acc, r) => acc + r.semCIN, 0);
  const gres = new Set(data.map((r) => r.codGRE));
  const municipios = new Set(data.map((r) => r.municipio));
  return {
    total,
    comCIN,
    semCIN,
    pctComCIN: safePct(comCIN, total),
    pctSemCIN: safePct(semCIN, total),
    totalGREs: gres.size,
    totalMunicipios: municipios.size,
  };
};

export const getServidorByTipo = (): ServidorByTipo[] => {
  const map = new Map<ServidorTipo, ServidorByTipo>();
  for (const r of data) {
    const cur =
      map.get(r.tipo) ??
      { tipo: r.tipo, total: 0, comCIN: 0, semCIN: 0, pctComCIN: 0 };
    cur.total += r.total;
    cur.comCIN += r.comCIN;
    cur.semCIN += r.semCIN;
    map.set(r.tipo, cur);
  }
  return [...map.values()].map((g) => ({
    ...g,
    pctComCIN: safePct(g.comCIN, g.total),
  }));
};

/** Totais agregados apenas para Docentes (Professor em sala de aula). */
export const getDocentesTotals = (): ServidorByTipo => {
  const rows = sumByTipo("Professor");
  const total = rows.reduce((a, r) => a + r.total, 0);
  const comCIN = rows.reduce((a, r) => a + r.comCIN, 0);
  const semCIN = rows.reduce((a, r) => a + r.semCIN, 0);
  return { tipo: "Professor", total, comCIN, semCIN, pctComCIN: safePct(comCIN, total) };
};

/** Totais agregados apenas para Servidores não-docentes (Administrativo). */
export const getAdministrativoTotals = (): ServidorByTipo => {
  const rows = sumByTipo("Administrativo");
  const total = rows.reduce((a, r) => a + r.total, 0);
  const comCIN = rows.reduce((a, r) => a + r.comCIN, 0);
  const semCIN = rows.reduce((a, r) => a + r.semCIN, 0);
  return {
    tipo: "Administrativo",
    total,
    comCIN,
    semCIN,
    pctComCIN: safePct(comCIN, total),
  };
};

/**
 * GREs com menor adesão entre servidores, podendo filtrar por tipo.
 * Mantém fatiamento por GRE (Teresina aparece como 04ª/19ª/20ª/21ª).
 */
export const getServidorByGre = (tipo?: ServidorTipo): ServidorByGre[] => {
  const source = tipo ? sumByTipo(tipo) : data;
  const map = new Map<string, ServidorByGre>();
  for (const r of source) {
    const cur =
      map.get(r.codGRE) ??
      { codGRE: r.codGRE, total: 0, comCIN: 0, semCIN: 0, pctComCIN: 0 };
    cur.total += r.total;
    cur.comCIN += r.comCIN;
    cur.semCIN += r.semCIN;
    map.set(r.codGRE, cur);
  }
  return [...map.values()]
    .map((g) => ({ ...g, pctComCIN: safePct(g.comCIN, g.total) }))
    .sort((a, b) => a.codGRE.localeCompare(b.codGRE));
};

/**
 * Consolidado por município (Teresina vira 1 linha somando as 4 GREs).
 * Use para rankings e tabelas "por município".
 */
export const getServidorByMunicipio = (
  tipo?: ServidorTipo,
): ServidorByMunicipio[] => {
  const source = tipo ? sumByTipo(tipo) : data;
  const map = new Map<string, ServidorByMunicipio>();
  for (const r of source) {
    const cur =
      map.get(r.municipio) ??
      { municipio: r.municipio, total: 0, comCIN: 0, semCIN: 0, pctComCIN: 0 };
    cur.total += r.total;
    cur.comCIN += r.comCIN;
    cur.semCIN += r.semCIN;
    map.set(r.municipio, cur);
  }
  return [...map.values()].map((m) => ({
    ...m,
    pctComCIN: safePct(m.comCIN, m.total),
  }));
};

export const getServidorWorstGres = (n = 5, tipo?: ServidorTipo): ServidorByGre[] =>
  [...getServidorByGre(tipo)].sort((a, b) => a.pctComCIN - b.pctComCIN).slice(0, n);
