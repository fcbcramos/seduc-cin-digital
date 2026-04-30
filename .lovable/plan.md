## Diagnóstico — seção "Cobertura por Gerência Regional de Educação"

Conferindo a tela atual em 1920px contra o print de referência (`image-13.png`), identifiquei exatamente o que está quebrado nos três blocos.

### Problema 1 — `Distribuição geral` está com layout interno colapsado

O card está usando um grid interno `260px | 1fr` para colocar o gauge à esquerda e as barras de Com CIN / Sem CIN à direita. Em telas largas o gauge fica isolado num canto, o card cresce horizontalmente sem necessidade, e sobra uma área vazia enorme embaixo.

Resultado: o card parece desproporcional, "alto e vazio".

### Problema 2 — Os blocos não estão organizados como no print

Hoje o layout da seção é:

```text
[ Distribuição geral (col-span 2) ] [ Top 5 Melhores ]
                                    [ Top 5 Prioritárias ]
```

A coluna direita empilha dois cards e fica muito mais alta que o card da esquerda → buraco visual gigante à esquerda do `Distribuição geral`.

No print de referência o layout é diferente e mais limpo:

```text
[      Distribuição geral (largura total)      ]
[ Top 5 Melhores ]   [ Top 5 Prioritárias ]
```

Distribuição em cima ocupando 100% da largura, e os dois Top 5 lado a lado em duas colunas iguais.

### Problema 3 — Badges de "Atenção" em todas as melhores GREs

No bloco `Top 5 — Melhores GREs`, todas as 5 linhas mostram badge amarela "Atenção", porque mesmo as melhores GREs têm cobertura entre 60–63% (ainda na faixa de atenção). Visualmente isso polui o ranking — não faz sentido um Top 5 das melhores parecer todo "amarelo".

### Problema 4 — Texto incorreto no Hero

O Hero diz "educação básica". O correto é "Ensino Fundamental e Ensino Médio".

---

## Plano de correção

### 1. Corrigir copy do Hero
Em `src/components/landing/Hero.tsx`, substituir "educação básica" por "Ensino Fundamental e Ensino Médio".

### 2. Reorganizar a seção `TerritorialDiagnosis` para o padrão do print
Em `src/components/landing/TerritorialDiagnosis.tsx`:

- Remover o grid `lg:grid-cols-3` que coloca Distribuição à esquerda e os dois Top 5 empilhados à direita.
- Novo layout, em stack vertical, alinhado ao container:

```text
Distribuição geral        (largura total do container)
Top 5 Melhores | Top 5 Prioritárias   (2 colunas iguais)
Cobertura por GRE — gráfico de barras  (largura total)
```

- Em telas menores os Top 5 viram 1 coluna empilhada.

### 3. Reformatar o card `Distribuição geral`
Manter o conteúdo (gauge + barras Com/Sem CIN + rodapé com totais), mas ajustar o layout interno para não criar área vazia em telas largas:

- Em desktop: gauge à esquerda em coluna fixa estreita, barras à direita ocupando o restante, **sem** o card crescer verticalmente além do necessário.
- Reduzir a altura do gauge para algo equilibrado com o conteúdo da direita.
- Garantir que o card cresça apenas o suficiente para abrigar seu conteúdo, sem espaço morto embaixo.

### 4. Reformatar os cards `Top 5 — Melhores` e `Top 5 — Prioritárias`
Em `RankingCard`:

- Manter borda lateral colorida (verde para Melhores, vermelho para Prioritárias) — está consistente com o print.
- **Remover a badge "Atenção" das linhas individuais** do ranking. O status de cada GRE já está implícito pelo card pai (Melhores vs Prioritárias) e pelo número de cobertura. As badges repetidas em todas as linhas poluem o visual e contradizem o título do card "Melhores".
- Substituir por apenas o número de cobertura à direita, em destaque, como no print de referência (`63,2%` à direita, sem badge).
- Manter o número do ranking (1–5) à esquerda, código da GRE em negrito, contagem de estudantes em cinza pequeno.

### 5. Validar visualmente
Após as correções, conferir em 1024px, 1280px, 1536px e 1920px:

- Distribuição geral ocupa largura total, sem espaço vazio embaixo.
- Top 5 Melhores e Top 5 Prioritárias ficam lado a lado, com altura visualmente equivalente.
- Não há badges repetidas em cada linha do ranking.
- Hero mostra "Ensino Fundamental e Ensino Médio".

## Arquivos afetados

- `src/components/landing/Hero.tsx` — correção de copy.
- `src/components/landing/TerritorialDiagnosis.tsx` — reorganização do grid da seção, ajuste do layout interno do `Distribuição geral`, e remoção das badges nas linhas do ranking.