## Diagnóstico de UI/UX (com base nas 3 marcações + auditoria geral)

### O que está ruim hoje

**1. Linguagem visual inconsistente — cara de "mosaico colorido"**
- Cada bloco usa uma combinação diferente de barra colorida no topo (azul / verde / vermelho / amarelo). Em uma única tela aparecem 6+ cores de destaque ao mesmo tempo (KPIs com 4 cores, AboutCIN com 4, Roadmap com 4, badges com mais 3). Resultado: parece um Pacman de cores em vez de um painel institucional.
- Emojis e gradientes de texto no Hero ("Projeto CIN nas Escolas" com gradient bg-clip) destoam do tom técnico-governamental.
- Mistura de border-radius (cards `rounded-2xl`, pills `rounded-full`, ícones `rounded-xl/lg`) sem hierarquia.

**2. Hierarquia de informação confusa (marcação da imagem 8)**
- Faixa de 6 KPIs todos com peso visual igual: o leitor não sabe o que é prioritário. "Total de estudantes" e "Cobertura geral" repetem o mesmo dado em formatos diferentes.
- "Universalizar a CIN em toda a rede SEDUC-PI" aparece DEPOIS dos 6 KPIs, mas é a meta-síntese — deveria ser o título da seção, não um card adicional. Cria redundância (a barra de progresso do card repete `56,5%` que já está no KPI 6).

**3. Espaços inconsistentes**
- Section padding `py-6 sm:py-8 lg:py-10` é apertado e não respira. Faixas alternadas `bg-muted/40` colam umas nas outras sem separação visual clara.
- AboutCIN: imagem da direita tem altura fixa enquanto os 4 cards à esquerda têm alturas variáveis → bloco "Campanha oficial" fica solto embaixo, desalinhado (marcação imagem 7).
- CTA "Garantir identidade documental" tem padding interno gigantesco (py-12/16/20) enquanto outras seções usam py-10. Inconsistente.

**4. Componente "Distribuição geral" fraco (marcação imagem 9)**
- Gauge semicircular grande à esquerda + 2 barras à direita = muito espaço para pouca informação (basicamente só mostra "56,5% Com CIN / 43,5% Sem CIN", redundante com os KPIs acima).
- Footer com "175.824 estudantes · 21 GREs · 224 municípios" repete os micro-KPIs do Hero.

**5. CTA full-bleed quebra a leitura**
- A faixa azul gigante no fim com foto + 3 stats repete dados ("76.535 sem CIN", "100% meta", "224 municípios") que JÁ aparecem 3 vezes na página. É decoração, não informação.

**6. Tipografia genérica**
- Tudo em sans-serif do sistema, mesmo peso (bold) em headings, KPIs e badges. Sem hierarquia tipográfica.
- "PAINEL INSTITUCIONAL / CIN nas Escolas — Rede Estadual" no header está apertado e pouco legível.

---

## Plano de refatoração

### Princípios da nova versão

1. **Sóbrio antes de bonito** — visual de relatório executivo de governo, não de landing page de SaaS.
2. **Uma cor de destaque por seção** — não 4. Tons neutros dominam; cor só pinta o dado relevante.
3. **Sem redundância** — cada métrica aparece UMA vez, no contexto certo.
4. **Densidade informacional alta** — painel é para tomada de decisão, não para "scrollar bonito".
5. **Tipografia com hierarquia** — display serif para títulos institucionais, sans para dados.

### Sistema de design (tokens em `src/styles.css`)

**Tipografia**
- Adicionar 2 fontes via Google Fonts `<link>` em `__root.tsx`:
  - `Fraunces` (serif moderna, institucional, gratuita) → títulos de seção e Hero.
  - `Inter` (já no DOM) → textos, dados, UI.
- Tokens: `--font-display: 'Fraunces', Georgia, serif;` e `--font-sans: 'Inter', system-ui, sans-serif;`.
- Escala tipográfica fixa: `text-xs=12, text-sm=13, text-base=15, text-lg=18, text-2xl=24, text-3xl=30, text-display=44`.

**Cores — paleta reduzida**
- `--surface` (branco quase puro), `--surface-muted` (cinza 50), `--surface-strong` (cinza 100).
- `--ink` (cinza 900), `--ink-muted` (cinza 600), `--ink-subtle` (cinza 500).
- `--brand` (azul institucional SEDUC, mantido) — único acento.
- `--positive`, `--warning`, `--critical` — usadas SOMENTE em status de dados (gráfico/tabela).
- Remover todos os usos decorativos de `secondary` (amarelo) e `accent` (verde) em ícones/cards.

**Espaçamento**
- Section: `py-16 lg:py-20` (mais respiro).
- Gap entre cards de seção: `gap-6 lg:gap-8`.
- Padding interno de card: `p-6` consistente (em vez de `p-3/p-4/p-5/p-6` misturados).

**Cards**
- Borda fina `border border-border/60`, sombra sutil `shadow-sm`, sem barra colorida no topo (a não ser para status crítico/atenção/ok).
- Border-radius único: `rounded-xl` para cards, `rounded-md` para chips/badges.

### Estrutura nova da página

```text
1. Header institucional       (logo + breadcrumb gov.br, sem gradient bar)
2. Hero                       (título serif + descrição + 1 imagem grande, SEM micro-KPIs)
3. KPI Strip                  (linha única de 4 KPIs essenciais — sticky em scroll)
4. Sobre a CIN                (4 pilares, layout horizontal, SEM imagens promocionais)
5. Diagnóstico territorial    (gráfico de barras grande + Top 5/Bottom 5)
6. Plano de ação municipal    (tabela)
7. Roadmap de execução        (timeline horizontal, não cards)
8. Adesão da rede             (3 indicadores secundários, mais discretos)
9. Footer                     (assinatura institucional)
```

Removidos: `CallToAction` (redundante), `UniversalizationGoal` como card separado (vira o título da seção 3), gauge semicircular (substituído por número grande + delta), bloco "Campanha oficial" do AboutCIN (vai para o footer como crédito).

### Mudanças por arquivo

**`src/styles.css`** — novos tokens (fontes, escala, paleta reduzida).

**`src/routes/__root.tsx`** — `<link>` Fraunces + Inter via Google Fonts.

**`src/routes/index.tsx`**
- `Section` com `max-w-[1280px]` (volta para 1280, mais legível) + `py-16 lg:py-20`.
- Remover `CallToAction` da árvore.
- Reordenar: Hero → KpiStrip → AboutCIN → Diagnóstico (com meta integrada) → Município → Roadmap → SecondaryIndicators → Footer.
- Tirar fundos `bg-muted/40` alternados; usar separadores `<hr>` finos ou só espaçamento.

**`src/components/landing/InstitutionalHeader.tsx`**
- Remover faixa gradient inferior (decorativa).
- Trocar título "Painel Institucional / CIN nas Escolas — Rede Estadual" por hierarquia tipográfica clara: serif pequena "SEDUC · Governo do Piauí" + sans bold "Painel CIN nas Escolas".
- Logo permanece, link gov.br vira ícone discreto.

**`src/components/landing/Hero.tsx`**
- Título com `font-display` (Fraunces) sem gradient.
- Remover bloco de 4 micro-KPIs (vão para o KpiStrip dedicado).
- Imagem ocupa 5/12, texto 7/12, altura fixa proporcional.
- Removidos os 2 badges decorativos no topo; manter só 1 badge "Em execução · Meta dez/2026".

**Novo: `src/components/landing/KpiStrip.tsx`**
- 4 KPIs apenas: Estudantes total, % Com CIN (com delta vs meta), Estudantes Sem CIN, GREs críticas.
- Layout horizontal denso, separadores verticais entre eles, sem cards individuais.
- `sticky top-0` opcional ao rolar (vira barra de status compacta).
- **Remove** `KpiSummary.tsx` antigo.

**`src/components/landing/AboutCIN.tsx`**
- Layout horizontal: 4 pilares em linha (`grid-cols-4`), ícones monocromáticos (todos brand), sem barra colorida.
- Remover bloco da imagem do cidadão e selo losango (decorativos, redundantes).
- Adicionar 1 callout linha-única no final: "Fonte: gov.br/governodigital — Carteira de Identidade Nacional" (link).

**`src/components/landing/TerritorialDiagnosis.tsx`**
- Substituir gauge semicircular por **header de seção integrado**: número grande "56,5%" + label "Cobertura atual · Meta 100% até dez/2026" + barra de progresso linear fina abaixo. Ocupa 1 linha no topo da seção.
- Top 5 Melhores e Top 5 Prioritárias mantidos, mas com layout idêntico (grid 1fr 1fr), sem `border-l-4` colorida — só ícone de tendência.
- Bar chart full-width permanece, mas com paleta reduzida (1 azul + 1 cinza para "abaixo da meta") em vez de 3 cores.
- Remover footer com "175.824 estudantes · 21 GREs · 224 municípios" (já no KpiStrip).

**`src/components/landing/UniversalizationGoal.tsx`**
- **Excluir o componente** — vira título + subtítulo da seção Diagnóstico.

**`src/components/landing/MunicipalityTable.tsx`**
- Manter funcionalidade, padronizar paddings/borders ao novo sistema.

**`src/components/landing/ExecutionRoadmap.tsx`**
- Trocar grid de cards por **timeline horizontal** com 7 nós (jun → dez 2026): linha contínua, marcos com mês, badge de intensidade, ao lado tabela compacta das GREs daquele mês.
- Cabeçalho da seção explica critério em 1 linha, não em card separado.

**`src/components/landing/SecondaryIndicators.tsx`**
- Manter os 3 cards (Docentes / Administrativo / Pais) mas reduzir peso visual: borda fina, sem cores fortes, padding consistente, GREs prioritárias em formato lista compacta sem badges amarelos.

**`src/components/landing/CallToAction.tsx`** — **excluir**.

**`src/components/landing/Footer.tsx`**
- Adicionar coluna com créditos: "Imagens da campanha CIN: gov.br · Dados: SEDUC-PI · Atualizado em mês/ano".
- Logo SEDUC + Governo do Piauí lado a lado, alinhamento limpo.

### QA
- Validar em 1366×768, 1536×864, 1920×1080.
- Conferir contraste AA em todos os textos (mínimo 4.5:1).
- Verificar que cada métrica aparece **uma única vez** na página.
- Conferir que a paleta usa no máximo 3 cores funcionais (brand + 2 status) por viewport.

### Resumo dos arquivos

```text
Modificados:
  src/styles.css                                    (tokens novos)
  src/routes/__root.tsx                             (fontes)
  src/routes/index.tsx                              (estrutura, ordem, espaços)
  src/components/landing/InstitutionalHeader.tsx
  src/components/landing/Hero.tsx
  src/components/landing/AboutCIN.tsx
  src/components/landing/TerritorialDiagnosis.tsx
  src/components/landing/ExecutionRoadmap.tsx
  src/components/landing/SecondaryIndicators.tsx
  src/components/landing/Footer.tsx
  src/components/landing/MunicipalityTable.tsx      (padronização visual)

Criados:
  src/components/landing/KpiStrip.tsx

Removidos:
  src/components/landing/KpiSummary.tsx
  src/components/landing/UniversalizationGoal.tsx
  src/components/landing/CallToAction.tsx
```

Após aprovação, implemento em sequência: tokens → header/hero → KpiStrip → AboutCIN → Diagnóstico → Roadmap → SecondaryIndicators → Footer → limpeza dos arquivos removidos → QA visual.
