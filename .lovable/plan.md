## Objetivo

Adotar a **logomarca oficial SEDUC + Governo do Piauí** como identidade visual do painel, e reestruturar a hierarquia de indicadores para o padrão pedido pelo Heulem (Prioritários: Alunos · Secundários: Responsáveis, Servidores não-docentes, Docentes), tratando corretamente o caso Teresina (1 município em 4 GREs).

---

## 1. Logomarca oficial

A nova arte é o **lockup completo** "Secretaria da Educação — SEDUC" + brasão "Governo do Piauí / Aqui tem trabalho. Aqui tem futuro.". Hoje o site usa apenas o brasão do Governo + um texto "SEDUC" digitado em HTML. Vamos passar a usar a marca oficial composta.

**Mudanças:**
- Adicionar `src/assets/seduc-piaui-lockup.png` (a imagem enviada)
- `InstitutionalHeader.tsx`: substituir o bloco de texto "Secretaria da Educação — SEDUC" + img por **uma única `<img>`** do lockup oficial, alinhada à esquerda, altura ~56px desktop / 44px mobile, com `alt` completo e acessível.
- `Footer.tsx`: trocar o logo do Governo pelo lockup oficial (mesmo padrão, escala menor).
- Remover `governo-piaui.png` apenas se não houver outras referências (verificar antes — provavelmente sim).

Sem alterações de cor, espaçamento ou tipografia do header — só substituição do ativo.

---

## 2. Reestruturação dos indicadores (padrão Heulem)

A mensagem do Heulem define **uma hierarquia formal** que o painel ainda não reflete. Vamos espelhar essa estrutura como **a arquitetura de seções** da landing.

### 2.1 Renomear a seção `#resumo` para "Indicadores Prioritários — Alunos"
- Eyebrow: `Indicadores prioritários`
- Título: `Alunos da rede estadual — ano letivo 2026`
- Description ajustada para refletir base 2026 com enturmação
- KpiSummary mantido como está (já cobre: total / com CIN / sem CIN / municípios adequados / críticos / cobertura)
- Mantém TerritorialDiagnosis (por GRE) e MunicipalityTable (por município) já existentes

### 2.2 Refatorar a seção `#servidores` em **3 blocos secundários**

Hoje existe um único `StaffAdoption` que mistura Professores + Administrativo. Vamos quebrar em uma **arquitetura de 3 cards equivalentes**, todos sob o mesmo eyebrow "Indicadores Secundários":

```text
Indicadores Secundários

┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ DOCENTES             │ │ SERVIDORES           │ │ RESPONSÁVEIS         │
│ (em sala de aula)    │ │ (não-docentes)       │ │ (pais / responsáveis)│
│                      │ │                      │ │                      │
│ 16.836 total         │ │ 13.154 total         │ │ — dados em coleta —  │
│ 13.278 com CIN 78,9% │ │ 10.161 com CIN 77,2% │ │ Aguardando integração│
│  3.558 sem CIN       │ │  2.993 sem CIN       │ │ com base CADÚNICO/   │
│                      │ │                      │ │ matrícula            │
│ [barra progresso]    │ │ [barra progresso]    │ │ [estado vazio]       │
│                      │ │                      │ │                      │
│ Top 3 GREs prior.    │ │ Top 3 GREs prior.    │ │                      │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

**Pontos importantes:**
- O bloco "Responsáveis" entra como **placeholder honesto** (empty state institucional), não inventa números — Heulem listou como indicador, então a estrutura precisa existir desde já. Texto: "Em consolidação — integração com base de matrícula".
- Cada bloco terá um link/anchor "ver detalhamento por GRE/município" que rola até a tabela operacional.
- Reaproveitar `KpiTile` e `CategoryRow` já existentes em `StaffAdoption` — extrair em componentes próprios reutilizáveis.

### 2.3 Tratamento de Teresina (caso confirmado: 1 município, 4 GREs)

Adicionar em `src/lib/cin-servidores.ts`:
- **Comentário JSDoc** no topo explicando a regra: Teresina aparece em 04ª, 19ª, 20ª e 21ª GRE por desenho administrativo da SEDUC.
- Função utilitária `getServidorByMunicipio()` que **consolida** Teresina em uma única linha (soma das 4 GREs) — para qualquer view "por município".
- Função `getServidorByGre()` mantida como está — Teresina permanece fatiada (correto para essa visão).
- `getServidorTotals().totalMunicipios` já usa `Set` por nome → continua retornando **224** (correto).

Aplicar a mesma regra em `src/lib/cin-data.ts` (alunos) — verificar se Teresina aparece igual lá; provavelmente sim, e o mesmo helper precisa existir.

### 2.4 Bloco de meta "Universalização até dez/2026"

Conforme a fala do Heulem ("a meta é universalizar a CIN na rede até o final do ano"), adicionar **uma faixa de meta** logo abaixo do KpiSummary, mostrando:
- Barra horizontal grande: progresso atual % vs meta 100%
- Gap absoluto: "Faltam X estudantes + Y servidores para universalização"
- Marco temporal: "Prazo: dez/2026 · 2 ondas de 3-4 meses"

Componente novo: `src/components/landing/UniversalizationGoal.tsx`.

---

## 3. Arquivos afetados

### Novos
- `src/assets/seduc-piaui-lockup.png` — logo oficial enviada
- `src/components/landing/SecondaryIndicators.tsx` — wrapper grid de 3 cards
- `src/components/landing/IndicatorBlock.tsx` — card reutilizável (Docentes / Servidores / Responsáveis)
- `src/components/landing/UniversalizationGoal.tsx` — faixa de meta

### Editados
- `src/components/landing/InstitutionalHeader.tsx` — usar lockup oficial
- `src/components/landing/Footer.tsx` — usar lockup oficial
- `src/lib/cin-servidores.ts` — `getServidorByMunicipio()` + `getServidoresProfessores()` / `getServidoresAdministrativo()` (helpers tipados separados) + JSDoc Teresina
- `src/lib/cin-data.ts` — verificar/adicionar `getStudentsByMunicipio()` consolidando Teresina
- `src/components/landing/StaffAdoption.tsx` — **removido** (substituído por `SecondaryIndicators`)
- `src/routes/index.tsx` — nova ordem de seções:
  1. `#prioritarios` → KpiSummary + UniversalizationGoal
  2. `#diagnostico` → TerritorialDiagnosis (alunos por GRE)
  3. `#municipios` → MunicipalityTable (alunos por município)
  4. `#secundarios` → SecondaryIndicators (3 blocos)
  5. CallToAction

### Removidos
- `src/assets/governo-piaui.png` — somente se nenhuma outra referência sobreviver

---

## 4. Detalhes técnicos

- **Tokens de design:** mantém todos os tokens atuais (`primary`, `accent`, `secondary`, `muted`, `border`). Sem novas cores. Sem inline styles.
- **Responsividade:** o grid de 3 secundários colapsa para 1 coluna em mobile, 2 em md, 3 em lg.
- **Acessibilidade:** todos os blocos com `<h3>` semântico, barras de progresso com `aria-label`, alt text completo no logo.
- **Estado vazio (Responsáveis):** ícone neutro + frase explicativa + badge "Em consolidação" — sem número fake.
- **Type safety:** novos helpers tipados, sem `any`, sem cast.

---

## 5. Critérios de aceite

- Logo oficial SEDUC+PI aparece no header e no footer com a proporção correta (não esticada, não cortada).
- Seção "Indicadores Prioritários — Alunos" mostra os mesmos KPIs de hoje, só renomeada.
- Faixa de meta exibe % atual de cobertura e gap até 100% com prazo dez/2026.
- Seção "Indicadores Secundários" mostra 3 cards lado a lado: Docentes (16.836 / 78,9%), Servidores não-docentes (13.154 / 77,2%), Responsáveis (estado vazio honesto).
- Em qualquer view "por município", Teresina aparece como **1 linha consolidada** (somando as 4 GREs).
- Em qualquer view "por GRE", Teresina permanece fatiada nas 04ª/19ª/20ª/21ª.
- Total de municípios continua exibindo **224** (não 227).
- Nenhuma regressão visual nas demais seções.
