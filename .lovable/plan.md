## Diagnóstico do que está pesado hoje

1. **Cards do Hero (`KpiSummary`)** estão em `xl:grid-cols-6` — viram 6 numa linha em telas grandes e quebram pra 2/linha em 1015px (viewport atual). O usuário quer **3 por linha** sempre que houver espaço.
2. **Espaçamento das seções** ainda usa `py-10 sm:py-14` no wrapper `Section` + `mt-5` interno + `gap-6` entre blocos — soma muito ar vertical.
3. **TopBar** (Ouvidoria / Portal SEDUC / e-mail / telefone) ocupa uma faixa azul-escura no topo e o usuário pediu pra remover.
4. **Logo SEDUC-PI** no `InstitutionalHeader` está em `h-12 sm:h-14` — pequena pra um documento institucional.
5. **Faltam dois conteúdos**:
   - As duas artes oficiais da campanha CIN do gov.br enviadas pelo usuário (rapaz com a CIN + losango amarelo com celular) não têm lugar.
   - **Roadmap de execução** por ondas, priorizando GREs com pior cobertura, depois as mais distantes de Teresina.
6. **Enriquecimento do conteúdo** vindo da página oficial gov.br/CIN: mensagens-chave (mesmo número do CPF, físico+digital com QR Code, validade Mercosul, porta de entrada para serviços e benefícios) hoje não aparecem.

---

## Mudanças propostas

### 1. Remover a TopBar
- Excluir `<TopBar />` de `src/routes/index.tsx`.
- Remover o arquivo `src/components/landing/TopBar.tsx`.

### 2. InstitutionalHeader — logo maior + faixa institucional do gov.br
- Aumentar logo para `h-16 sm:h-20 lg:h-24`.
- Adicionar à direita um bloco enxuto: "Painel CIN nas Escolas · Rede Estadual" com micro-link para o portal oficial da CIN no gov.br (abre em nova aba, `rel="noopener"`).
- Manter a barra de gradiente institucional embaixo.

### 3. Compactar espaçamentos globais
- `Section`: trocar `py-10 sm:py-14` por `py-6 sm:py-8 lg:py-10`.
- `Hero`: `py-8 sm:py-12 lg:py-16` → `py-6 sm:py-8 lg:py-10`; reduzir `mb-5` dos badges para `mb-3`; `mt-7` dos KPIs para `mt-5`.
- `KpiSummary`: gap `gap-4` → `gap-3`.
- `IndicatorBlock`: `gap-5 p-6` → `gap-4 p-5`; reduzir `mb-2` interno.
- `UniversalizationGoal`: `p-5 sm:p-6 lg:p-7` → `p-4 sm:p-5`; `mt-5` → `mt-4`.
- `index.tsx`: a margem `mt-5` entre `KpiSummary` e `UniversalizationGoal` vira `mt-4`.

### 4. KpiSummary — 3 por linha
Trocar a grade de `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6` para **`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`** fixo (3 cards por linha em desktop, 2 colunas × 2 linhas em tablet). Mantém os 6 KPIs, vira layout 3×2 em desktop, mais respirável e legível.

### 5. Nova seção "Sobre a CIN" (entre Hero e Indicadores prioritários)
Componente novo: `src/components/landing/AboutCIN.tsx`.

Layout em 2 colunas no desktop:
- **Coluna esquerda (7/12)** — 4 mini-cards verticais, 2×2:
  - "Uma identidade para todo o Brasil" — validade nacional + Mercosul.
  - "Mesmo número do CPF" — substitui o RG, evita duplicidade.
  - "Mais segura" — QR Code, integração com gov.br, conta Ouro.
  - "Físico + Digital" — papel, cartão e app gov.br.
  - Texto curto (1–2 linhas) + ícone Lucide. Sem efeito ornamental.
  - Fonte: parafraseado da página oficial gov.br/CIN (sem copiar literalmente).
- **Coluna direita (5/12)** — composição visual com as **duas imagens oficiais enviadas**:
  - Imagem 1 (`1d587f33-...png` — rapaz segurando CIN) como hero da coluna, recortada.
  - Imagem 2 (`imagem1-1.png` — losango amarelo com celular) como peça institucional menor sobreposta ou logo abaixo.
  - Caption discreta: "Campanha oficial — Governo Federal".

Salvar as imagens enviadas em:
- `src/assets/cin-campanha-cidadao.png`
- `src/assets/cin-campanha-losango.png`

### 6. SecondaryIndicators continua 3 colunas (já está) — só compactar gap
- `gap-5` → `gap-4`. (O usuário pediu "3 por linha"; já está. Confirmar visualmente após reduzir spacing.)

### 7. Nova seção "Roadmap de execução" (entre Tabela de municípios e Indicadores secundários)
Componente novo: `src/components/landing/ExecutionRoadmap.tsx` + helper `src/lib/cin-roadmap.ts`.

**Lógica de priorização (`cin-roadmap.ts`)**:
1. Para cada GRE, calcular score = `(100 - pctComCIN) * 0.7 + distanciaTeresinaKm_normalizada * 0.3`.
2. Tabela estática `GRE_SEATS` mapeia cada uma das 21 GREs para `{ sede, distanciaKmTeresina }` (valores rodoviários conhecidos das sedes — Teresina = 0; Parnaíba ≈ 343; Floriano ≈ 240; Picos ≈ 312; Bom Jesus ≈ 632; Corrente ≈ 800; São Raimundo Nonato ≈ 530; Piripiri ≈ 168; Campo Maior ≈ 84; Valença ≈ 220; Oeiras ≈ 220; União ≈ 60; Esperantina ≈ 188; Uruçuí ≈ 442; São João do Piauí ≈ 460; Fronteiras ≈ 410; Paulistana ≈ 466; Canto do Buriti ≈ 411; Simplício Mendes ≈ 384; Itaueira ≈ 320 — números são aproximações operacionais para priorização, não dado oficial).
3. Distribuir as 21 GREs em **4 ondas trimestrais** (ago–out/2025, nov/25–jan/26, fev–abr/26, mai–jul/26 — datas finais ajustadas ao prazo de dez/2026 já comunicado na seção de meta), de modo que cada onda tenha ~5 GREs e o score acumulado seja decrescente: onda 1 = piores cobertura + mais distantes; onda 4 = capital e entorno (cobertura já maior).
4. Função pura `getRoadmap(): RoadmapWave[]` retorna `{ wave, periodo, gres: [{ codGRE, sede, distanciaKm, pctComCIN, semCIN, prioridadeScore }] }`.

**UI (`ExecutionRoadmap.tsx`)**:
- Cabeçalho com legenda da regra ("Priorizamos GREs com menor cobertura e maior distância de Teresina, garantindo cobertura uniforme até dez/2026").
- 4 cards de onda em grid `lg:grid-cols-4` (em telas menores: 2 colunas, depois 1).
- Cada card mostra: período, nº de GREs, total de estudantes sem CIN naquela onda, e lista compacta das GREs (código, sede, gap em %, distância em km).
- Cor por onda usa o gradiente institucional já existente (vermelho → amarelo → verde → azul) para reforçar "do mais crítico ao mais regular".
- Sem chart pesado — visual de checklist operacional.

Adicionar a nova seção em `src/routes/index.tsx` com `SectionHeader` (eyebrow "Roadmap de execução", `eyebrowTone="destructive"` na primeira leitura — depois reavaliar).

### 8. Footer
- Sem mudanças estruturais. Apenas garantir que continua coerente com a logo maior do header (talvez `h-12` no footer).

---

## Estrutura final da página

```
InstitutionalHeader (logo grande, sem TopBar acima)
Hero
  Indicadores prioritários (KpiSummary 3×2 + UniversalizationGoal)
Sobre a CIN (NOVO — 4 mini-cards + artes oficiais)
  Diagnóstico por GRE (TerritorialDiagnosis)
  Plano de ação por município (MunicipalityTable)
Roadmap de execução (NOVO — 4 ondas)
  Indicadores secundários (SecondaryIndicators)
CallToAction
Footer
```

---

## Detalhes técnicos

- **Assets**: copiar `user-uploads://1d587f33-27f8-4e9c-b18d-ab54af0b1ee6.png` → `src/assets/cin-campanha-cidadao.png` e `user-uploads://imagem1-1.png` → `src/assets/cin-campanha-losango.png`. Importar com `import x from "@/assets/..."`.
- **Tokens**: usar `bg-primary`, `bg-accent`, `bg-secondary`, `bg-destructive` e variantes `/10 /20`. Nenhum hex novo.
- **Tipos**: `RoadmapWave`, `RoadmapGre`, sem `any`. Tabela de distâncias tipada como `Record<string, { sede: string; distanciaKm: number }>` com chave igual ao `codGRE` retornado por `getStudentByGre()`.
- **Acessibilidade**: cada card de onda tem `<h3>` próprio; cores não são o único sinal (cada onda mostra "Onda 1 · Crítica", "Onda 2 · Alta" etc.).
- **Sem mudança de dados**: o roadmap consome `getStudentByGre()` que já existe.

## Critérios de aceite

- TopBar removida.
- Logo SEDUC-PI visivelmente maior no header.
- KPIs principais em 3 por linha no desktop (3×2).
- Espaçamento vertical entre seções perceptivelmente menor (sem quebrar respiro).
- Nova seção "Sobre a CIN" com as duas artes oficiais e 4 mensagens-chave da gov.br.
- Nova seção "Roadmap de execução" com 4 ondas, prioridade por gap + distância de Teresina, datas até dez/2026.
- Build TanStack passa sem erro.
