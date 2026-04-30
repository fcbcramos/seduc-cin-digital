## O que muda

### 1. Roadmap — janela jun a dez/2026 (7 ondas mensais)
Em `src/lib/cin-roadmap.ts`:
- Trocar a divisão atual (4 ondas trimestrais jan–dez/26) por **7 ondas mensais**, uma por mês de junho a dezembro de 2026.
- Cada onda recebe ~3 GREs (21 ÷ 7 = 3 exatas) na ordem de prioridade já calculada (`(100 - cobertura) × 0.7 + distância × 0.3`).
- Sequência: **Jun, Jul, Ago, Set, Out, Nov, Dez 2026**.
- Tons reaproveitados do gradiente institucional, do mais crítico (vermelho) ao consolidação (azul/verde): destructive → secondary → secondary → accent → accent → primary → primary.
- Ajustar `intensidade` para refletir 7 níveis enxutos: "Crítica", "Crítica", "Alta", "Alta", "Média", "Consolidação", "Fechamento".
- Em `src/components/landing/ExecutionRoadmap.tsx`: mudar grid de `xl:grid-cols-4` para `lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7` (em telas comuns, 3–4 cards por linha; o usuário enxerga sequência clara). Reduzir densidade interna (apenas 3 GREs por card cabe melhor).
- Atualizar texto de cabeçalho da seção em `src/routes/index.tsx`: "Plano em 7 ondas mensais — junho a dezembro de 2026".

### 2. Card de "Pais e responsáveis" — sair do placeholder
Os dados **já existem** no JSON `cin-coverage.json` (campos `qtdParentes`, `qtdParenteComCIN`, `qtdParenteSemCIN`). Totais reais: **263.982 responsáveis · 72.534 com CIN · 191.448 sem CIN · 27,5% de cobertura**. O card está vazio só porque o componente nunca foi conectado.

Mudanças:
- `src/lib/cin-data.ts`: adicionar tipos `ParentTotals` e `ParentByGre`, e funções puras `getParentTotals()`, `getParentByGre()` (consolida por GRE) e `getParentWorstGres(n)`.
- `src/components/landing/SecondaryIndicators.tsx`: substituir `IndicatorBlockEmpty` pelo `IndicatorBlock` real, alimentado por `getParentTotals()` + `getParentWorstGres(3)`. Mantém o tom `secondary` (amarelo) já definido na hierarquia visual.
- Texto: "Famílias dos estudantes da rede — base de matrícula 2026".

### 3. Não muda nada mais
- KPI principal de estudantes, diagnóstico por GRE, tabela municipal e meta de universalização permanecem como estão.
- A seção "Sobre a CIN" e a logo do header não são tocadas.

## Critérios de aceite
- Roadmap renderiza 7 cards mensais (Jun–Dez/2026), 3 GREs cada, ordenados por prioridade.
- Card "Pais e responsáveis" mostra 263.982 / 27,5% e as 3 GREs prioritárias, sem badge "Em consolidação".
- Build passa sem erro.
