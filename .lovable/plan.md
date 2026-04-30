## Contexto

A planilha enviada contém **dados oficiais de servidores** da rede SEDUC-PI (não estudantes), agrupados por GRE / Município / Tipo (Professor ou Administrativo).

### Resumo do dataset
- **454 linhas** · **21 GREs** · **224 municípios**
- **29.990 servidores** no total
  - Professores: **16.836** (78,9% com CIN)
  - Administrativos: **13.154** (77,2% com CIN)
- **Cobertura geral: 78,2%** com CIN · **6.551 sem CIN**
- Faixa por GRE: **71,7% (16ª GRE) → 83,4% (08ª GRE)**

Ou seja, é um excelente **indicador indireto de adesão institucional**: mostra que a própria rede (quem leciona e administra) já está majoritariamente regularizada — argumento de credibilidade para a campanha junto aos estudantes.

## Solução: nova seção "Adesão da Rede — Servidores"

Inserida **entre o KPI Summary e o Diagnóstico das GREs (estudantes)**, posicionada como contexto institucional da campanha.

### Layout

```text
┌────────────────────────────────────────────────────────────┐
│ ADESAO DA REDE                                             │
│ Servidores da SEDUC-PI ja com CIN                          │
│ Indicador indireto de engajamento institucional            │
├────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ 29.990   │  │  78,2%   │  │  6.551   │                  │
│  │SERVIDORES│  │  COM CIN │  │ SEM CIN  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                            │
│  Cobertura por categoria                                   │
│  Professores       78,9% ████████████████░░░  16.836       │
│  Administrativos   77,2% ███████████████░░░░  13.154       │
│                                                            │
│  GREs com menor adesao entre servidores                    │
│  ┌─────────────────────────────────────────────┐           │
│  │ 16ª GRE  921 servidores  71,7%  ░░░░        │           │
│  │ 14ª GRE  808 servidores  73,9%  ░░░░        │           │
│  │ 05ª GRE 1.390 servidores 74,7%  ░░░░        │           │
│  │ 17ª GRE  643 servidores  75,0%  ░░░░        │           │
│  │ 15ª GRE  939 servidores  75,4%  ░░░░        │           │
│  └─────────────────────────────────────────────┘           │
└────────────────────────────────────────────────────────────┘
```

## Arquivos

### Novos
- `src/data/cin-servidores.json` — 454 registros (GRE / Município / Tipo / total / comCIN / semCIN)
- `src/lib/cin-servidores.ts` — helpers tipados: `getServidorTotals`, `getServidorByTipo`, `getServidorByGre`, `getServidorWorstGres`
- `src/components/landing/StaffAdoption.tsx` — seção completa com:
  - 3 KPI cards compactos (total / com CIN / sem CIN)
  - Comparativo Professor vs Administrativo (barras horizontais com `Progress`)
  - Lista das 5 GREs com menor adesão (formato compacto, igual aos rankings já existentes)

### Editados
- `src/routes/index.tsx` — inserir `<StaffAdoption />` entre `<KpiSummary />` e `<TerritorialDiagnosis />`

## Pontos de design
- Reutiliza tokens já definidos (`accent`, `secondary`, `border`, `muted`)
- Usa `Card`, `Progress` e `Badge` do shadcn já presentes — sem novas dependências
- Mantém a hierarquia visual: KPIs estudantes (foco) → adesão servidores (contexto) → diagnóstico GREs estudantes (ação)
- Subtítulo deixa claro que é **indicador indireto**, não a métrica principal do projeto

## Critérios de aceite
- Os 3 KPIs exibem 29.990 / 78,2% / 6.551
- Comparativo mostra Professor (78,9%) acima de Administrativo (77,2%)
- Top 5 GREs prioritárias entre servidores aparece ordenado da menor para a maior cobertura
- Seção respeita o mesmo padrão visual (sombra, espaçamento, tipografia) das demais
