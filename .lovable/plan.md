## Objetivo

Três ajustes de polimento na landing:

1. **Espaçamento** — apertar a hierarquia vertical (mobile principalmente: vi no print que há um vão grande entre o final da faixa de meta e o próximo header).
2. **Identidade visual do Piauí** — usar com mais convicção as cores oficiais (azul `#034ea2`, amarelo `#fdb913`, verde `#007932`, vermelho `#ef4123`) que já estão nos tokens, mas hoje aparecem tímidas em superfícies neutras.
3. **Imagens da rede estadual do Piauí** — trocar as duas fotos genéricas do Unsplash (Hero + CallToAction) por imagens reais de alunos da rede pública estadual do Piauí.

---

## 1. Imagens reais da rede estadual do PI

Hoje `Hero.tsx` e `CallToAction.tsx` usam fotos do Unsplash (alunos genéricos asiáticos / mesa de estudo). Quero substituir por imagens institucionais verdadeiras da rede SEDUC-PI.

**Estratégia em 2 etapas:**

a) **Buscar primeiro fontes oficiais** via `websearch--web_search` em domínios como `seduc.pi.gov.br`, `pi.gov.br/noticias`, `ccom.pi.gov.br` (Comunicação do Governo) — buscando termos como "rede estadual Piauí alunos sala de aula", "estudantes SEDUC-PI escola", "CIN nas escolas Piauí". Imagens de portais governamentais brasileiros são de uso institucional.

b) **Se a etapa (a) não retornar 2 imagens utilizáveis em alta resolução**, gerar via Nano Banana Pro (`google/gemini-3-pro-image-preview`) duas imagens fotorrealistas de:
   - Hero: estudantes brasileiros adolescentes em sala de aula de escola pública, uniforme cinza/azul, ambiente nordestino, luz natural
   - CTA: estudante recebendo documento (CIN) em ambiente escolar

Salvar em `src/assets/aluno-rede-estadual-pi.jpg` e `src/assets/aluno-cin-piaui.jpg`. Importar como ES module (não URL externa) — melhor para SSR e elimina dependência de domínio externo.

**Pergunta importante antes de eu sair gerando:** quer que eu tente primeiro as fontes oficiais (pode levar 2-3 buscas) ou já parto direto para gerar com IA? Vou assumir **tentar oficial primeiro, fallback para IA** se não responder.

---

## 2. Reforço de cores institucionais

Os tokens já estão certos no `styles.css` (azul SEDUC, amarelo, verde, vermelho). O que precisa mudar é **onde** eles aparecem:

- **`InstitutionalHeader.tsx`**: hoje é `bg-card` (branco). Trocar para um header com fundo `bg-primary` sutil ou faixa superior amarela `bg-secondary` de 4px (carimbo Governo do PI). Mantém o lockup oficial visível.
- **Faixas separadoras de seção**: a `gradient-institutional` (4 cores PI) hoje aparece só no rodapé do Hero e no topo de `UniversalizationGoal`. Adicionar também como faixa de 2px abaixo do `InstitutionalHeader` para amarrar a identidade.
- **Eyebrows das seções** (`SectionHeader.tsx`): hoje usam só `text-primary` (azul). Alternar a cor do eyebrow por seção temática:
  - Indicadores prioritários → `text-primary` (azul)
  - Diagnóstico por GRE → `text-accent` (verde)
  - Plano de ação por município → `text-destructive` (vermelho — urgência)
  - Indicadores secundários → `text-foreground` com fundo `bg-secondary/30` em pill
- **`SecondaryIndicators`**: o 3º card (Responsáveis) deveria usar `accent="secondary"` (amarelo) em vez de só borda tracejada cinza, para manter a paleta institucional viva mesmo no estado vazio.
- **Hero**: o gradiente do texto "CIN nas Escolas" hoje vai `primary → accent → secondary`. Manter, mas aumentar peso do amarelo para sair mais "Piauí".

Sem inventar cor nova — só usar mais os tokens que já existem.

---

## 3. Ajustes de espaçamento

Olhando o screenshot mobile (375px) e o código:

- **`UniversalizationGoal`**: o `CardContent` usa `grid gap-6 lg:grid-cols-[1.5fr_1fr]`. Em mobile, o grid colapsa em 1 coluna mas o `gap-6` (24px) entre o bloco texto e os 2 tiles fica largo demais. Reduzir para `gap-4` em mobile, `gap-6` em lg.
- **`Section` wrapper** (em `routes/index.tsx`): hoje `py-12 sm:py-14`. Em mobile o ritmo fica pesado entre seções consecutivas. Reduzir para `py-10 sm:py-14`.
- **`SectionHeader`**: `mb-6 sm:mb-8` está ok, mas a transição `KpiSummary → UniversalizationGoal` usa `mt-6` que vira excessivo após o grid de KPIs. Reduzir para `mt-5`.
- **`Hero`**: `py-10 sm:py-12 lg:py-16` ok no desktop, mas no mobile o gap interno (`gap-8`) entre coluna de texto e imagem é exagerado quando empilha. Reduzir para `gap-6 lg:gap-12`.
- **`CallToAction`**: `py-16 sm:py-20` muito grande no mobile. Reduzir para `py-12 sm:py-16 lg:py-20`.
- **Footer**: padding ok.
- **Alvo geral**: ritmo mais denso em mobile sem comprometer respiração desktop.

---

## 4. Arquivos afetados

### Novos
- `src/assets/aluno-rede-estadual-pi.jpg` — Hero (oficial PI ou gerada)
- `src/assets/aluno-cin-piaui.jpg` — CTA (oficial PI ou gerada)

### Editados
- `src/components/landing/Hero.tsx` — importar nova imagem, ajustar `gap-*`, reforçar amarelo no gradiente do título
- `src/components/landing/CallToAction.tsx` — importar nova imagem, ajustar `py-*`, ajustar overlay
- `src/components/landing/UniversalizationGoal.tsx` — `gap-4 lg:gap-6` no CardContent
- `src/components/landing/InstitutionalHeader.tsx` — adicionar faixa `gradient-institutional` de 2px no rodapé
- `src/components/landing/SecondaryIndicators.tsx` — terceiro card usar `accent="secondary"` (amarelo, mesmo em estado vazio)
- `src/components/landing/IndicatorBlock.tsx` — adicionar suporte a `accent="secondary"` no `IndicatorBlockEmpty` (variante colorida do empty)
- `src/components/landing/SectionHeader.tsx` — aceitar `eyebrowTone?: "primary" | "accent" | "destructive" | "secondary"` (default primary)
- `src/routes/index.tsx` — passar `eyebrowTone` em cada `SectionHeader`, ajustar `py-*` do `Section`, `mt-5` no UniversalizationGoal

---

## 5. Critérios de aceite

- Hero e CallToAction mostram imagens reais (oficiais ou geradas por IA) de alunos da rede estadual do PI — não Unsplash genérico.
- Header institucional tem faixa de 2px com gradiente das 4 cores oficiais do PI logo abaixo do lockup.
- Eyebrows das 4 seções usam cores diferentes (azul, verde, vermelho, amarelo) — sinalização visual de quadrante.
- Card "Responsáveis" usa amarelo institucional como cor de destaque (mesmo no estado vazio).
- Em mobile (375px), o ritmo vertical entre a faixa "Universalizar" e o próximo header "Diagnóstico por GRE" fica visivelmente mais apertado que hoje.
- Nenhuma cor nova adicionada ao `styles.css` — só uso dos tokens existentes.
- Build TanStack passa sem erro.
