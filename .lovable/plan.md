## Nova seção: Kit de Hardware para Atendimento

Adicionar uma seção institucional descrevendo o kit de captura utilizado nos pontos de atendimento, no mesmo padrão visual das demais seções (Section + SectionHeader + cards/tabela com tokens já existentes).

### Onde entra na página

Inserir entre `ExecutionRoadmap` (Roadmap) e `SecondaryIndicators` (Adesão da rede) em `src/routes/index.tsx`. Justificativa: depois do "como será executado" (roadmap), faz sentido mostrar "com o quê será executado" (kit), antes da adesão dos públicos.

Background alternado: como o Roadmap já é `muted`, esta seção fica `default` (fundo branco), mantendo o ritmo visual de alternância da landing.

### Estrutura visual

```text
┌──────────────────────────────────────────────────────────────────┐
│ Eyebrow: Infraestrutura                                          │
│ Título: Kit de hardware para atendimento                         │
│ Descrição: Composição padrão do ponto de captura...              │
├──────────────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌────────────┐ ┌────────────┐                     │
│ │ 10 kits    │ │ R$ 25.000  │ │ R$ 250.000 │  (3 KPIs resumo)    │
│ │ previstos  │ │ valor unit.│ │ inv. total │                     │
│ └────────────┘ └────────────┘ └────────────┘                     │
├──────────────────────────────────────────────────────────────────┤
│ Card único: Composição do kit                                    │
│ ┌────┬──────────────────┬──────────────────┬─────────────────┐   │
│ │ Qt │ Item             │ Modelo de ref.   │ Função          │   │
│ ├────┼──────────────────┼──────────────────┼─────────────────┤   │
│ │ 01 │ Biombo de atend. │ MAKO             │ Privacidade...  │   │
│ │ 02 │ Estações...      │ Dell Optiplex... │ Captura/apoio   │   │
│ │ 01 │ Câmera digital   │ Canon PowerShot..│ Captura foto    │   │
│ │ 01 │ Pad de assinat.  │ Akiyama AK560    │ Assinatura el.  │   │
│ │ 01 │ Leitor biométr.  │ Suprema RealScan │ Impressões dig. │   │
│ └────┴──────────────────┴──────────────────┴─────────────────┘   │
│ Nota de rodapé: descrição operacional do kit (texto fornecido)   │
└──────────────────────────────────────────────────────────────────┘
```

Em telas pequenas a tabela vira lista de cards empilhados (cada item do kit = um cartão com Qt + Item + Modelo + Função), aproveitando o componente `Table` existente que já tem `overflow-auto`.

### Arquivos

**Criar** `src/components/landing/HardwareKit.tsx`:
- Dados do kit como `const KIT_ITEMS` tipado dentro do próprio arquivo (5 itens, fixos — não justifica um JSON separado).
- 3 mini-cards de KPI no topo (qtd kits, valor unitário, investimento total) usando o mesmo padrão visual dos cards já existentes na landing (border-l-4, ícone pequeno no header, número grande, label).
- Card principal contendo a tabela (`@/components/ui/table`) com colunas: Quantidade, Termo genérico, Modelo de referência, Descrição/Função.
- Rodapé do card com a descrição operacional fornecida pelo usuário (parágrafo cinza pequeno).
- Ícones do `lucide-react`: `PackageCheck` (kits), `Wallet` (valor unit.), `Banknote` (investimento total), `Cpu` no header da seção.
- Formatação monetária via `formatNumber` ou `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`.

**Editar** `src/routes/index.tsx`:
- Importar `HardwareKit`.
- Inserir um novo `<Section id="kit-hardware">` com `SectionHeader` (eyebrow "Infraestrutura", título "Kit de hardware para atendimento", descrição curta) entre `roadmap` e `secundarios`.

### Conteúdo (textos exatos)

- Eyebrow: `Infraestrutura`
- Título: `Kit de hardware para atendimento`
- Descrição da seção: `Composição padrão do ponto de captura biométrica e fotográfica utilizado nas operações da CIN nas escolas. Serão mobilizados 10 kits para cobrir as ondas do roadmap.`
- KPIs:
  - `10` — Kits previstos
  - `R$ 25.000` — Valor aproximado por kit
  - `R$ 250.000` — Investimento total estimado
- Tabela: os 5 itens conforme fornecido pelo usuário.
- Nota de rodapé do card: o parágrafo "Kit de captura composto por estrutura de atendimento, duas estações de trabalho..." literalmente como o usuário enviou.

### Padronização (não inventar)

- Usar `Section`, `SectionHeader` e `Container` já existentes — sem `max-w-*` solto.
- Tipografia, cores e radius vêm dos tokens; nada de cor hardcoded.
- Tabela usa o componente `@/components/ui/table` para herdar tipografia/bordas do design system.
- Sem novas dependências.

### Critério de aceite

- Nova seção aparece entre Roadmap e Adesão da rede, com fundo branco (default).
- Três mini-KPIs no topo, alinhados como os demais cards da landing.
- Tabela legível em desktop com 4 colunas; em mobile rola horizontalmente sem quebrar layout.
- Nenhum dado fora do que o usuário forneceu; nenhuma cor/fonte nova.
