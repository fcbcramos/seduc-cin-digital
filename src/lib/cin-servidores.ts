import rawData from "@/data/cin-servidores.json";

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

const data = rawData as ServidorRow[];

const safePct = (part: number, total: number): number =>
  total === 0 ? 0 : (part / total) * 100;

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
  return Array.from(map.values()).map((g) => ({
    ...g,
    pctComCIN: safePct(g.comCIN, g.total),
  }));
};

export const getServidorByGre = (): ServidorByGre[] => {
  const map = new Map<string, ServidorByGre>();
  for (const r of data) {
    const cur =
      map.get(r.codGRE) ??
      { codGRE: r.codGRE, total: 0, comCIN: 0, semCIN: 0, pctComCIN: 0 };
    cur.total += r.total;
    cur.comCIN += r.comCIN;
    cur.semCIN += r.semCIN;
    map.set(r.codGRE, cur);
  }
  return Array.from(map.values())
    .map((g) => ({ ...g, pctComCIN: safePct(g.comCIN, g.total) }))
    .sort((a, b) => a.codGRE.localeCompare(b.codGRE));
};

export const getServidorWorstGres = (n = 5): ServidorByGre[] =>
  [...getServidorByGre()].sort((a, b) => a.pctComCIN - b.pctComCIN).slice(0, n);
