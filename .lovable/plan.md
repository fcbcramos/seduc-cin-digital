
# Landing Institucional — Projeto CIN nas Escolas (SEDUC-PI)

## Objetivo
Página executiva de uma rota só (`/`) que apresenta o projeto de cobertura da Carteira de Identidade Nacional (CIN) na rede estadual do Piauí. Usa **dados reais** da planilha enviada para indicadores e diagnóstico territorial, e **estrutura preparada com placeholders sinalizados** para os blocos de gestão de projeto (roadmap, plano de ação, marcos, riscos, próximos passos) que serão alimentados depois.

## Identidade visual (espelhada do projeto REGC)
- Fonte **Montserrat** (Google Fonts), pesos 300–800.
- Paleta institucional Governo do Piauí em HSL tokens:
  - Primary `#034ea2` (azul), Secondary `#fdb913` (amarelo), Accent `#007932` (verde), Destructive `#ef4123` (vermelho).
- Radius `0.75rem`, sombras suaves (`shadow-card`, `shadow-institutional`), gradientes `gradient-header` e `gradient-institutional`.
- Classes utilitárias semânticas: `status-success / warning / danger / info`, `card-hover`.
- Tudo via design tokens em `src/styles.css` — zero cor hardcoded em componentes.

## Dados da planilha (fonte real)
Arquivo: `Analise_Estudantes_ComSem_CIN.xlsx` — 227 linhas, 21 GREs, 224 municípios.
Colunas: `codGRE, municipio, qtdEstudantes, qtdEstudanteComCIN, qtdEstudanteSemCIN, qtdParentes, qtdParenteComCIN, qtdParenteSemCIN`.

Totais consolidados:
- 175.824 estudantes — 56,5% com CIN, 43,5% sem CIN
- 263.982 parentes — 27,5% com CIN, 72,5% sem CIN

A planilha será copiada para `src/data/cin-coverage.json` (gerado a partir do .xlsx) e exposta por um service `src/lib/cin-data.ts` com agregações memoizadas (totais gerais, por GRE, ranking, top gaps).

## Estrutura da página

```text
[Hero institucional]                ← gradient-header, brasão SEDUC-PI, status geral
[Resumo Executivo — KPIs]           ← 6 cards (dados reais da planilha)
[Diagnóstico Territorial]           ← cobertura por GRE (tabela + barras Recharts)
[Plano de Ação por Município]       ← tabela filtrável (dados reais)
[Roadmap do Projeto]                ← timeline horizontal com placeholders sinalizados
[Plano de Ação Operacional]         ← tabela com placeholders sinalizados
[Marcos e Entregáveis]              ← cards com placeholders sinalizados
[Riscos e Pontos de Atenção]        ← cards com placeholders sinalizados
[Próximos Passos]                   ← lista com placeholders sinalizados
[Rodapé institucional]
```

### 1. Hero
Nome do projeto, descrição curta, órgão (SEDUC-PI), período de execução *(placeholder)*, badge de status geral, e 4 micro-indicadores: % cobertura estudantes, % cobertura parentes, total de municípios, total de GREs.

### 2. Resumo Executivo (dados reais)
6 cards: Total estudantes · Estudantes com CIN · Estudantes sem CIN · Total parentes · Parentes sem CIN · % avanço geral. Cada card com ícone, número grande, delta e barra de progresso.

### 3. Diagnóstico Territorial (dados reais)
- Gráfico de barras horizontais (Recharts) por GRE: % cobertura estudantes vs parentes.
- Tabela compacta com 21 GREs: total estudantes, % com CIN, total parentes, % com CIN, status (verde ≥70%, amarelo 40–69%, vermelho <40%).

### 4. Plano de Ação por Município (dados reais)
Tabela com 224 municípios, colunas: GRE, Município, Estudantes, % com CIN, Parentes, % com CIN, Gap absoluto, Status. Filtros: GRE, status, busca por nome. Ordenação por gap (foco operacional).

### 5–9. Blocos com placeholders sinalizados
Cada bloco renderizado com layout final, mas mostrando um `EmptyDataNotice` padrão:
> ⓘ Campo sem origem identificada — aguardando dados de gestão do projeto.

Estrutura preparada:
- **Roadmap**: timeline horizontal com 4–5 fases vazias (cards skeleton com slots: nome, período, entregas, status, progresso).
- **Plano de Ação**: tabela com colunas (Ação, Descrição, Responsável, Área, Prazo, Status, Prioridade, Observações) e estado vazio.
- **Marcos**: grid de 6 cards skeleton (data, marco, responsável, status).
- **Riscos**: grid de cards com slots (descrição, severidade, mitigação, owner).
- **Próximos Passos**: lista numerada com slots.

## Componentes a criar

Em `src/components/landing/`:
- `Hero.tsx`
- `KpiSummary.tsx` + `KpiCard.tsx`
- `TerritorialDiagnosis.tsx` (Recharts BarChart)
- `MunicipalityTable.tsx` (filtros + ordenação + paginação)
- `RoadmapTimeline.tsx` (com modo placeholder)
- `ActionPlanTable.tsx` (com modo placeholder)
- `MilestonesGrid.tsx` (com modo placeholder)
- `RisksGrid.tsx` (com modo placeholder)
- `NextStepsList.tsx` (com modo placeholder)
- `EmptyDataNotice.tsx` (componente padrão "sem origem identificada")
- `SectionHeader.tsx` (título + subtítulo padronizados)
- `Footer.tsx`

UI base: reutiliza `Card`, `Badge`, `Button`, `Table`, `Input`, `Select`, `Progress`, `Separator`, `Tabs` já presentes em `src/components/ui/`.

## Dados e arquivos de suporte
- `src/data/cin-coverage.json` — dump da planilha (227 registros).
- `src/lib/cin-data.ts` — tipos `MunicipioCIN`, `GreAggregate`, e funções `getTotals()`, `getByGre()`, `getMunicipalities()`, `getGapRanking()`.
- `src/lib/format.ts` — helpers `formatNumber`, `formatPercent`, `getCoverageStatus(pct)` retornando `'success' | 'warning' | 'danger'`.

## Tokens / estilos
Adicionar em `src/styles.css` os tokens HSL e utilitários do REGC (primary azul PI, secondary amarelo, accent verde, destructive vermelho, gradientes, sombras, classes `status-*`). Importar Montserrat. Configurar `font-family` no body.

## Roteamento
Toda a landing vive em `src/routes/index.tsx` (uma rota só, conforme briefing de página institucional única). `head()` com title, description, og:title, og:description próprios.

## Responsividade
- Mobile (≤640px): KPIs em 2 colunas, gráficos empilhados, tabela com scroll horizontal.
- Tablet (641–1024px): KPIs em 3 colunas.
- Desktop (≥1025px): KPIs em 6 colunas, tabela full-width.

## Acessibilidade
Headings semânticos (`h1`/`h2`/`h3`), labels em filtros, foco visível, contraste ≥4.5:1, status comunicado por ícone+texto+cor (nunca só cor), tabelas com `<caption>` e `scope`.

## Detalhes técnicos
- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn/ui (já configurados).
- Conversão da planilha para JSON feita via script Python local (openpyxl/pandas) durante a implementação; o JSON resultante é commitado em `src/data/`.
- Recharts já está disponível no template.
- Sem chamadas de rede, sem backend — toda a página é estática SSR.
- Strict TS, sem `any`, sem `console.log`, sem dados mockados nos blocos com fonte real.

## Fora de escopo (deste plano)
- Roadmap/plano/marcos/riscos com dados reais — entram quando você enviar a planilha de gestão.
- Exportação PDF, autenticação, filtros avançados de múltipla seleção.
