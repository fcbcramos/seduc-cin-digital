## Problema

O donut atual está visualmente pobre: muito espaço vazio, dois segmentos genéricos (verde/vermelho) sem hierarquia, sem números absolutos, sem contexto. Para 2 categorias, donut é o pior formato.

## Solução: Card "Distribuição geral" reformulado

Substituir o donut por um **gauge semicircular (radial)** + **big number central** + **breakdown lateral com números absolutos**, tudo dentro do mesmo card, ocupando o espaço de forma densa e informativa.

### Layout proposto

```text
┌─────────────────────────────────────────────────────────┐
│ Distribuição geral                                      │
│ Estudantes Com vs Sem CIN — rede estadual               │
│                                                         │
│   ┌──────────────┐    ● Com CIN                         │
│   │   ╭─────╮    │      99.289 estudantes        56,5%  │
│   │  ╱  56% ╲   │      ████████████░░░░░░░               │
│   │ │  COM   │   │                                       │
│   │  ╲ CIN  ╱    │    ● Sem CIN                          │
│   │   ╰─────╯    │      76.535 estudantes        43,5%  │
│   │ Meta: 100%   │      ████████░░░░░░░░░░░               │
│   └──────────────┘                                       │
│                                                         │
│  Total: 175.824 estudantes · 21 GREs · 227 municípios   │
└─────────────────────────────────────────────────────────┘
```

### Componentes

1. **Gauge semicircular (RadialBar do Recharts)** — meio círculo de 180°, preenchimento verde representando 56,5%, fundo vermelho-claro = lacuna. Big number "56,5%" + label "COM CIN" centralizados.
2. **Breakdown ao lado** — duas linhas com:
   - bullet colorido + label
   - número absoluto formatado (`99.289`, `76.535`)
   - barra de progresso horizontal (reusa `Progress` shadcn)
   - percentual à direita
3. **Rodapé do card** — linha de contexto: total + GREs + municípios.

### Card ocupa lg:col-span-2

Atualmente o card de distribuição ocupa 1/3 da grade. Vou aumentá-lo para **2/3** (lg:col-span-2) e empilhar os dois rankings (Top 5 melhores / piores) na coluna lateral. Isso dá ao gauge espaço para respirar e mantém densidade informativa.

```text
┌───────────────────────────┬──────────────────┐
│  Distribuição geral       │  Top 5 melhores  │
│  (gauge + breakdown)      ├──────────────────┤
│                           │  Top 5 críticas  │
└───────────────────────────┴──────────────────┘
```

## Arquivos a alterar

- `src/components/landing/TerritorialDiagnosis.tsx`
  - Substituir bloco `<PieChart>` por `<RadialBarChart>` semicircular (startAngle=180, endAngle=0)
  - Adicionar breakdown lateral com `Progress`
  - Mudar grid externo de `lg:grid-cols-3` para `lg:grid-cols-3` mantendo o card principal em `lg:col-span-2` e os dois rankings empilhados em `lg:col-span-1` (`flex-col`)
  - Adicionar rodapé com contexto agregado

Sem novos arquivos, sem novas dependências (Recharts já tem `RadialBarChart`, `Progress` já existe).

## Critérios de aceite

- Gauge semicircular renderiza com fill verde sólido e trilho cinza-claro
- Big number "56,5%" centralizado dentro do gauge
- Breakdown mostra números absolutos formatados em pt-BR
- Card principal ocupa 2/3 da largura em desktop
- Em mobile (<lg), tudo empilha verticalmente e mantém legibilidade
