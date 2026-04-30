## Diagnóstico (viewport 1920×1080)

Capturei a página em fullscreen e identifiquei estes problemas reais:

1. **Larguras inconsistentes entre seções**
   - Quase toda a página usa `max-w-7xl` (1280px) centralizado, deixando ~320px de margem branca de cada lado em telas ≥1920px.
   - O `CallToAction` é **full-bleed** (sem `max-w-7xl`), então a faixa azul ocupa 1920px enquanto o conteúdo acima fica em 1280px — quebra visual evidente.
   - O `InstitutionalHeader` também limita a 1280px, fazendo o logo "flutuar" no meio da tela em vez de ancorar à esquerda da viewport.
   - O `Footer` segue o mesmo padrão de 1280px.

2. **Imagens cortadas / desproporcionais em telas largas**
   - `Hero`: imagem da direita usa altura fixa `lg:h-[460px]` mas a coluna estica em telas >1280px, cortando a aluna em primeiro plano (mãos/folha sumindo em baixo).
   - `CallToAction`: a foto de fundo usa `object-cover object-left` numa faixa de 1920×~440px → o estudante aparece deslocado e o gradiente azul cobre 75% da imagem, mas em 1920px o gradiente se estica e a foto fica praticamente invisível à direita.
   - O card "Cada estudante com sua identidade garantida" no Hero tem o gradiente cobrindo demais o rosto da estudante.

3. **Cards/containers desalinhados ou grandes demais**
   - `KpiSummary` em 3 colunas fica com cards de ~400px de largura cada em telas ≥1280px — números pequenos no meio de muito espaço vazio.
   - `SecondaryIndicators` (3 cards): cada card cresce demais; tabelas de "GREs prioritárias" ficam com muito espaço entre código GRE e percentual.
   - `ExecutionRoadmap` usa `2xl:grid-cols-7` que só ativa em ≥1536px. Entre 1280px e 1535px os cards ficam em 4 colunas com a 5ª, 6ª e 7ª ondas quebradas para a linha de baixo, criando uma fileira órfã visualmente desbalanceada.
   - O `UniversalizationGoal` em 2 colunas (1.5fr_1fr) fica com a barra de progresso enorme em telas largas.

4. **Header**
   - Logo SEDUC à esquerda fica isolado no centro-esquerdo da tela, e o bloco "Painel Institucional" no centro-direito, com ~600px vazios em cada extremo.

## Plano de correção

### A) Padronizar largura máxima do site
Adotar **uma única largura de conteúdo**: `max-w-[1440px]` (em vez de `max-w-7xl`/1280px) para todas as seções, header, hero, CTA e footer. Isso:
- Aproveita melhor monitores 1920px sem ficar "esticado" demais.
- Garante que as faixas full-bleed do CTA tenham o conteúdo interno alinhado com o restante da página.

Arquivos:
- `src/routes/index.tsx` → trocar `max-w-7xl` por `max-w-[1440px]` no helper `Section`.
- `src/components/landing/InstitutionalHeader.tsx` → mesmo ajuste.
- `src/components/landing/Hero.tsx` → mesmo ajuste no container interno.
- `src/components/landing/CallToAction.tsx` → trocar `max-w-7xl` do conteúdo por `max-w-[1440px]` (mantendo a imagem/gradiente full-bleed).
- `src/components/landing/Footer.tsx` → mesmo ajuste.

### B) Corrigir cortes/proporções de imagem

**Hero** (`Hero.tsx`):
- Aumentar a altura do bloco direito em telas grandes para acompanhar o crescimento da coluna de texto: `lg:h-[460px] xl:h-[520px]`.
- Mudar `object-cover` para `object-cover object-[center_30%]` para enquadrar melhor o rosto/mãos da estudante.
- Ajustar gradiente para `from-primary/45 via-primary/10 to-transparent` (deixa a foto mais visível).

**CallToAction** (`CallToAction.tsx`):
- Trocar imagem `object-left` por `object-[30%_center]` para manter o estudante visível mesmo em 1920px.
- Reduzir o overlay da direita: `from-primary/95 via-primary/70 to-primary/20` → menos opacidade na ponta direita para a foto respirar.
- Limitar a altura da seção (`max-h-[520px]`) para não esticar a foto verticalmente.

### C) Densificar cards em telas grandes

**KpiSummary** (`KpiSummary.tsx`):
- Em telas ≥1280px usar 6 colunas (1 linha só) com cards mais compactos: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`. Reduz altura visual e elimina espaço vazio.

**SecondaryIndicators**:
- Manter 3 colunas mas adicionar `max-w-[1280px] mx-auto` no grid para impedir que cresça demais dentro do container 1440px.

**ExecutionRoadmap** (`ExecutionRoadmap.tsx`):
- Mudar breakpoint do grid de 7 colunas para `xl:grid-cols-7` (1280px) em vez de `2xl:grid-cols-7`. Assim a partir de 1280px já mostra as 7 ondas em uma única linha, eliminando a fileira órfã.

**UniversalizationGoal** (`UniversalizationGoal.tsx`):
- Ajustar grid para `lg:grid-cols-[2fr_1fr]` e adicionar `max-w-[1100px] mx-auto` no card para não ficar gigantesco em telas largas.

### D) Header — ancorar o logo
- Aumentar tamanho máximo do logo: `h-16 sm:h-20 lg:h-24 xl:h-28`.
- Manter `max-w-[1440px]` para alinhar com o resto, mas adicionar um `min-h-[96px]` para estabilizar a barra.

## Resumo dos arquivos editados

```text
src/routes/index.tsx                                  (largura padrão)
src/components/landing/InstitutionalHeader.tsx        (largura + logo)
src/components/landing/Hero.tsx                       (largura + imagem)
src/components/landing/CallToAction.tsx               (largura + imagem)
src/components/landing/Footer.tsx                     (largura)
src/components/landing/KpiSummary.tsx                 (6 colunas em xl)
src/components/landing/SecondaryIndicators.tsx        (cap de largura)
src/components/landing/UniversalizationGoal.tsx       (cap de largura)
src/components/landing/ExecutionRoadmap.tsx           (xl:grid-cols-7)
```

## QA pós-implementação
- Validar visualmente em 1920×1080, 1536×864 e 1366×768.
- Verificar que nenhuma seção tem mais conteúdo "espremido" que o vizinho.
- Confirmar que o estudante na foto do Hero e do CTA aparece sem ser cortado.
