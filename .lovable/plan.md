## Objetivo

Voltar ao estado visual anterior (tipografia Inter, paleta colorida original, componentes restaurados) e, sobre essa base, construir um sistema rígido de padronização de containers, grids, espaçamento e proporções que não quebre quando a viewport muda.

---

## Parte 1 — Reversão da última refatoração

### Tipografia
- Remover `Fraunces` do `@import` em `src/styles.css`.
- Remover token `--font-display` (Fraunces) — voltar a usar `Inter` (sans) em tudo.
- Remover todas as classes `font-display` espalhadas pelos componentes.
- Remover heading override `h1..h6 { font-family: var(--font-display) }` em `@layer base`.

### Paleta de cores
- Restaurar a paleta colorida original em `src/styles.css`:
  - `--primary` (azul SEDUC) com `--primary-glow`
  - `--secondary` (amarelo institucional, não cinza)
  - `--accent` (verde) como cor de status positivo
  - `--destructive` (vermelho)
- Restaurar utilitários e gradientes que foram removidos: `gradient-institutional`, `shadow-card-hover`, `card-hover`, etc.
- Manter `text-positive/warning/critical` apenas como aliases de status para gráficos.

### Componentes
- Recriar `KpiSummary.tsx`, `UniversalizationGoal.tsx`, `CallToAction.tsx` no estado em que estavam antes (linha do tempo: versão "6 KPIs + meta de universalização + CTA full-bleed").
- Reverter `Hero.tsx`, `AboutCIN.tsx`, `IndicatorBlock.tsx`, `InstitutionalHeader.tsx`, `TerritorialDiagnosis.tsx` (com gauge), `ExecutionRoadmap.tsx` (com cards coloridos), `Footer.tsx` ao formato anterior.
- Remover `KpiStrip.tsx` (criado na última iteração).
- Restaurar a ordem original em `src/routes/index.tsx`: Header → Hero → KpiSummary → AboutCIN → UniversalizationGoal → TerritorialDiagnosis → MunicipalityTable → ExecutionRoadmap → SecondaryIndicators → CallToAction → Footer.
- Remover `SectionHeader.tsx` se não for mais necessário (ou reverter ao estado anterior).

---

## Parte 2 — Sistema de padronização (a parte nova)

### 2.1 Tokens de container em `styles.css`

Definir três larguras fixas, e nada mais:

```text
--container-narrow : 960px   (texto longo, descrições)
--container-base   : 1280px  (todo conteúdo padrão de seções)
--container-wide   : 1440px  (Header, Hero, Footer — apenas faixas full-bleed)
```

Plus tokens de espaçamento de seção:

```text
--section-padding-y       : clamp(3rem, 5vw, 5rem)   (py-12 a py-20)
--section-padding-x       : clamp(1.5rem, 4vw, 2.5rem)
--section-gap-internal    : 2rem  (gap entre header da seção e conteúdo)
--card-gap                : 1.5rem (gap entre cards de uma mesma grid)
--card-padding            : 1.5rem (p-6 — único padding interno permitido)
```

### 2.2 Componente `<Container>` único

Criar `src/components/layout/Container.tsx`:

```tsx
type Size = "narrow" | "base" | "wide";
<Container size="base">{children}</Container>
```

Aplica largura, padding horizontal, e centraliza. **Nenhum componente de página pode usar `max-w-*` ad-hoc** — sempre usa `<Container>`.

### 2.3 Componente `<Section>` único

Criar `src/components/layout/Section.tsx`:

```tsx
<Section id="..." background="default | muted">
  {children}
</Section>
```

- Aplica `--section-padding-y` vertical
- Envolve em `<Container size="base">` automaticamente
- Garante separação consistente entre seções (sem mais "py-6/py-10/py-16" misturados)

### 2.4 Grid system fixo por tipo

Criar tokens de grid reutilizáveis (classes utilitárias em `styles.css`):

```text
.grid-kpis-6     →  1 → 2 → 3 → 6   (mobile→sm→md→lg)
.grid-kpis-4     →  1 → 2 → 4
.grid-cards-3    →  1 → 2 → 3
.grid-cards-2    →  1 → 2
.grid-roadmap-7  →  1 → 2 → 4 → 7
```

Todas com `gap: var(--card-gap)`. **Proibido `grid-cols-X` ad-hoc nos componentes** — sempre usar essas classes.

### 2.5 Padding interno de cards

- Toda `<CardContent>` usa `p-6` (= `--card-padding`).
- Eliminar `p-3 / p-4 / p-5 / p-8` espalhados.
- Cards têm altura igual dentro de uma mesma grid via `h-full` no Card e `flex flex-col` no CardContent.

### 2.6 Imagens — proporções fixas

- Hero: `aspect-[16/7]` em todas as resoluções, `object-cover object-[center_30%]`.
- AboutCIN imagem promocional: `aspect-[4/3]`.
- CallToAction background: `aspect-[21/9]` máximo, evitando cortes em telas largas.
- **Nunca mais alturas fixas em px** que quebram quando a viewport cresce.

### 2.7 Auditoria componente a componente

Para cada um dos componentes restaurados, refatorar para usar EXCLUSIVAMENTE o sistema acima:
- Trocar wrappers `<div className="mx-auto max-w-...">` por `<Container>`.
- Trocar `<section className="py-X">` por `<Section>`.
- Trocar `grid grid-cols-1 md:grid-cols-X` por `.grid-cards-X`.
- Trocar paddings de card variados por `p-6`.
- Remover qualquer largura interna conflitante (ex.: `SecondaryIndicators` tinha `max-w-[1280px]` aninhado dentro de outro `max-w-[1280px]`).

---

## Resultado esperado

- Mesma identidade visual de antes da última refatoração (Inter, paleta colorida, todos os componentes originais).
- Em qualquer viewport entre 360px e 2560px, a página mantém:
  - Container central de largura previsível, sem "espremido" nem "gigante".
  - Cards do mesmo tipo sempre alinhados, mesma altura, mesmo padding.
  - Espaçamento vertical constante entre seções.
  - Imagens nunca cortam mal porque usam aspect-ratio em vez de altura fixa.

---

## Detalhes técnicos

**Arquivos novos:**
- `src/components/layout/Container.tsx`
- `src/components/layout/Section.tsx`

**Arquivos restaurados ao estado pré-refatoração:**
- `src/styles.css` (tokens originais + adições do sistema novo)
- `src/components/landing/KpiSummary.tsx` (recriado)
- `src/components/landing/UniversalizationGoal.tsx` (recriado)
- `src/components/landing/CallToAction.tsx` (recriado)
- `src/components/landing/Hero.tsx`, `AboutCIN.tsx`, `IndicatorBlock.tsx`, `InstitutionalHeader.tsx`, `TerritorialDiagnosis.tsx`, `ExecutionRoadmap.tsx`, `Footer.tsx`, `SecondaryIndicators.tsx`

**Arquivos removidos:**
- `src/components/landing/KpiStrip.tsx`

**Arquivos auditados e refatorados para o novo sistema (sem mudar visual):**
- Todos os componentes de `src/components/landing/` + `src/routes/index.tsx`

**Não muda:**
- `MunicipalityTable.tsx` (já estava ok)
- Lógica de dados em `src/lib/`
- Roteamento

---

## Validação

Após a implementação, vou abrir a preview em três viewports diferentes (1366×768, 1920×1080, 360×800) e tirar screenshot para conferir que tudo permanece alinhado e proporcional antes de devolver.