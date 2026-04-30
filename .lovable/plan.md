## Objetivo

Evoluir o gráfico "Cobertura CIN por Gerência Regional" em `src/components/landing/TerritorialDiagnosis.tsx` para:

1. Mostrar, para cada GRE, a composição dos seus municípios em três faixas: **Adequado (≥70%)**, **Atenção (40–69%)** e **Crítico (<40%)** — alinhado à legenda já exibida.
2. Permitir interação por clique:
   - Clicar em um item da **legenda** liga/desliga aquela faixa (toggle de série).
   - Clicar em uma **barra (GRE)** seleciona a GRE e abre um painel de drill-down inline logo abaixo do gráfico, com a lista de municípios daquela GRE agrupados por faixa.

A barra atual de "% de cobertura" é substituída por barras empilhadas de **contagem de municípios por faixa** (mais informativa e coerente com a legenda). O percentual de cobertura da GRE continua disponível no tooltip e no painel de drill-down.

## Mudanças

### 1. `src/lib/cin-data.ts` — novo seletor

Adicionar um seletor que retorna, por GRE, a contagem de municípios em cada faixa e a lista de municípios com % de cobertura. Sem alterar seletores existentes.

```ts
export type CoverageTier = "adequado" | "atencao" | "critico";

export interface GreCoverageBreakdown {
  codGRE: string;
  pctComCIN: number;          // já existente em GreStudentAggregate
  estudantes: number;
  adequado: number;            // nº de municípios >= 70%
  atencao: number;             // 40–69%
  critico: number;             // < 40%
  municipios: Array<{
    municipio: string;
    estudantes: number;
    pctComCIN: number;
    tier: CoverageTier;
  }>;
}

export const getCoverageBreakdownByGre = (): GreCoverageBreakdown[] => { ... };
```

A função reutiliza `data` (já carregado) e `safePct`. Tier classificado pela mesma regra de `barColor` em `TerritorialDiagnosis.tsx` para garantir consistência visual.

### 2. `src/components/landing/TerritorialDiagnosis.tsx` — gráfico e interação

- Trocar o `<BarChart>` de série única por **barras empilhadas** com três `<Bar dataKey="adequado|atencao|critico" stackId="tier">`, usando as cores já definidas em `CHART_COLORS` (`accent`, `secondary`, `destructive`).
- Eixo Y passa a representar **nº de municípios** (inteiro, sem `%`). O percentual da GRE aparece no tooltip como linha extra ("Cobertura: XX,X%").
- **Legenda customizada** (substitui os `LegendDot` atuais): cada item vira um botão com `aria-pressed`, controlando um estado `visibleTiers: Set<CoverageTier>`. Faixas desligadas são removidas do stack e ficam visualmente atenuadas no item da legenda.
- **Clique na barra**: handler `onClick` no `<Bar>` (via prop `onClick={(d) => setSelectedGre(d.codGRE)}`). Seleção destacada com borda na barra (renderizando `<Cell stroke>` para a GRE ativa). Re-clicar na mesma GRE limpa a seleção.
- **Painel de drill-down inline**: abaixo do gráfico, dentro do mesmo `Card`, renderizar um bloco condicional quando `selectedGre` existe. Mostra:
  - Cabeçalho com código da GRE, % de cobertura, nº de municípios, botão "Fechar".
  - Três sub-listas agrupadas por faixa (mesmas cores), cada município com nome, total de estudantes e % de cobertura. Layout em grid responsivo (`md:grid-cols-3`).
  - Usa `Card` interno com `bg-muted/40` para distinguir do gráfico, mantendo tokens.
- Acessibilidade: legenda navegável por teclado (`<button>`), barras com `role="button"` e `aria-label`, ESC fecha o painel.
- Sem novas dependências. Sem hex hardcoded — todas as cores via `CHART_COLORS` já existentes (que já são tokens OKLCH compatíveis).

### 3. Sem alterações em outros arquivos

`KpiSummary`, `MunicipalityTable` e demais seções permanecem inalteradas.

## Layout (ASCII)

```text
┌─ Card: Cobertura CIN por Gerência Regional ─────────────────┐
│  título + subtítulo            [Adequado][Atenção][Crítico] │  ← legenda clicável
│  ─────────────────────────────────────────────────────────  │
│  ▆▆ ▆ ▆▆ ▆▆▆ ▆ ▆▆ ▆▆ ▆ ▆▆▆ ▆▆ ▆ ▆▆ ▆▆▆ ▆ ▆▆ ▆▆ ▆ ▆▆ ▆▆▆   │  ← barras empilhadas por GRE
│  1ª 2ª 3ª 4ª … 21ª                                          │
│  ─────────────────────────────────────────────────────────  │
│  ▼ 5ª GRE — Cobertura 62,3% — 14 municípios       [Fechar]  │  ← drill-down (quando selecionado)
│  ┌ Adequado ─────┐ ┌ Atenção ──────┐ ┌ Crítico ──────────┐ │
│  │ Município A 82%│ │ Município D 55%│ │ Município G  28% │ │
│  │ Município B 78%│ │ Município E 47%│ │ Município H  19% │ │
│  └───────────────┘ └───────────────┘ └──────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Notas técnicas

- Estado local com `useState<Set<CoverageTier>>` para legenda e `useState<string | null>` para GRE selecionada.
- Toggle de série: ao desligar uma faixa, removemos o `<Bar>` correspondente do render (Recharts re-renderiza o stack automaticamente). Domínio do Y recalculado por Recharts.
- Tooltip customizado para incluir as três contagens + % cobertura + total de estudantes da GRE.
- Performance: dataset tem 21 GREs — cálculo do breakdown é O(n) sobre os ~184 municípios, executado uma vez via `useMemo`.
- TypeScript estrito mantido; sem `any`. Tipos novos exportados de `cin-data.ts`.
