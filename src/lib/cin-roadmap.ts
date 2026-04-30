import { getStudentByGre, type GreStudentAggregate } from "./cin-data";

/**
 * Roadmap de execução por ondas.
 *
 * Regra: prioridade = (100 - cobertura) * 0.7 + distância normalizada * 0.3.
 * Quanto maior, mais cedo a GRE entra. As 21 GREs são divididas em 4 ondas
 * trimestrais até dez/2026 (prazo institucional já comunicado na meta).
 *
 * Distâncias rodoviárias da sede da GRE até Teresina são aproximações
 * operacionais (km), suficientes para priorização logística — não devem ser
 * usadas como medida oficial.
 */

export interface RoadmapGre {
  codGRE: string;
  sede: string;
  distanciaKm: number;
  estudantes: number;
  semCIN: number;
  pctComCIN: number;
  prioridadeScore: number;
}

export type WaveTone = "destructive" | "secondary" | "accent" | "primary";

export interface RoadmapWave {
  wave: number;
  label: string;
  periodo: string;
  intensidade: string;
  tone: WaveTone;
  gres: RoadmapGre[];
  totalEstudantes: number;
  totalSemCIN: number;
}

interface SedeInfo {
  sede: string;
  distanciaKm: number;
}

/**
 * Mapeamento das 21 GREs do Piauí com sede e distância rodoviária aproximada
 * até Teresina. Chaves devem casar com `codGRE` retornado por getStudentByGre().
 */
const GRE_SEATS: Record<string, SedeInfo> = {
  "01ª GRE": { sede: "Teresina (zona Norte)", distanciaKm: 0 },
  "02ª GRE": { sede: "Campo Maior", distanciaKm: 84 },
  "03ª GRE": { sede: "Piripiri", distanciaKm: 168 },
  "04ª GRE": { sede: "Teresina (zona Sul)", distanciaKm: 0 },
  "05ª GRE": { sede: "Parnaíba", distanciaKm: 343 },
  "06ª GRE": { sede: "Esperantina", distanciaKm: 188 },
  "07ª GRE": { sede: "Oeiras", distanciaKm: 220 },
  "08ª GRE": { sede: "Picos", distanciaKm: 312 },
  "09ª GRE": { sede: "Floriano", distanciaKm: 240 },
  "10ª GRE": { sede: "Bom Jesus", distanciaKm: 632 },
  "11ª GRE": { sede: "Corrente", distanciaKm: 800 },
  "12ª GRE": { sede: "São Raimundo Nonato", distanciaKm: 530 },
  "13ª GRE": { sede: "Uruçuí", distanciaKm: 442 },
  "14ª GRE": { sede: "São João do Piauí", distanciaKm: 460 },
  "15ª GRE": { sede: "Fronteiras", distanciaKm: 410 },
  "16ª GRE": { sede: "Paulistana", distanciaKm: 466 },
  "17ª GRE": { sede: "Canto do Buriti", distanciaKm: 411 },
  "18ª GRE": { sede: "Simplício Mendes", distanciaKm: 384 },
  "19ª GRE": { sede: "Teresina (zona Leste)", distanciaKm: 0 },
  "20ª GRE": { sede: "Teresina (zona Sudeste)", distanciaKm: 0 },
  "21ª GRE": { sede: "Teresina (Centro/RM)", distanciaKm: 0 },
};

const fallback = (cod: string): SedeInfo => ({ sede: cod, distanciaKm: 200 });

interface WaveMeta {
  label: string;
  periodo: string;
  intensidade: string;
  tone: WaveTone;
}

const WAVES: WaveMeta[] = [
  { label: "Onda 1", periodo: "Junho · 2026", intensidade: "Crítica", tone: "destructive" },
  { label: "Onda 2", periodo: "Julho · 2026", intensidade: "Crítica", tone: "destructive" },
  { label: "Onda 3", periodo: "Agosto · 2026", intensidade: "Alta", tone: "secondary" },
  { label: "Onda 4", periodo: "Setembro · 2026", intensidade: "Alta", tone: "secondary" },
  { label: "Onda 5", periodo: "Outubro · 2026", intensidade: "Média", tone: "accent" },
  { label: "Onda 6", periodo: "Novembro · 2026", intensidade: "Consolidação", tone: "primary" },
  { label: "Onda 7", periodo: "Dezembro · 2026", intensidade: "Fechamento", tone: "primary" },
];

const enrichGre = (g: GreStudentAggregate, maxDist: number): RoadmapGre => {
  const seat = GRE_SEATS[g.codGRE] ?? fallback(g.codGRE);
  const distNorm = maxDist === 0 ? 0 : (seat.distanciaKm / maxDist) * 100;
  const score = (100 - g.pctComCIN) * 0.7 + distNorm * 0.3;
  return {
    codGRE: g.codGRE,
    sede: seat.sede,
    distanciaKm: seat.distanciaKm,
    estudantes: g.estudantes,
    semCIN: g.semCIN,
    pctComCIN: g.pctComCIN,
    prioridadeScore: score,
  };
};

export const getRoadmap = (): RoadmapWave[] => {
  const gres = getStudentByGre();
  const maxDist = Math.max(
    ...gres.map((g) => (GRE_SEATS[g.codGRE] ?? fallback(g.codGRE)).distanciaKm),
  );
  const enriched = gres
    .map((g) => enrichGre(g, maxDist))
    .sort((a, b) => b.prioridadeScore - a.prioridadeScore);

  const total = enriched.length;
  const numWaves = WAVES.length;
  const baseSize = Math.floor(total / numWaves);
  const remainder = total % numWaves;
  const sizes = WAVES.map((_, i) => baseSize + (i < remainder ? 1 : 0));

  let cursor = 0;
  return WAVES.map((meta, idx) => {
    const slice = enriched.slice(cursor, cursor + sizes[idx]);
    cursor += sizes[idx];
    return {
      wave: idx + 1,
      ...meta,
      gres: slice,
      totalEstudantes: slice.reduce((acc, r) => acc + r.estudantes, 0),
      totalSemCIN: slice.reduce((acc, r) => acc + r.semCIN, 0),
    };
  });
};
