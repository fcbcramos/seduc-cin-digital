Entendi agora: os três blocos devem ter o mesmo padrão visual e ficar na mesma linha.

Vou corrigir assim:

```text
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ Distribuição geral    │ │ Top 5 — Melhores GREs│ │ Top 5 — Prioritárias │
│ mesmo formato/card    │ │ mesmo formato/card    │ │ mesmo formato/card   │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

Plano de alteração

1. Transformar “Distribuição geral” em card igual aos rankings
   - Mesmo tamanho visual.
   - Mesmo padding.
   - Mesmo cabeçalho: ícone pequeno + título + subtítulo.
   - Mesma estrutura interna compacta.
   - Remover o card largo com gauge grande, porque ele está destoando dos outros dois.

2. Colocar os três cards lado a lado
   - Usar grid com 3 colunas para desktop e janelas largas/intermediárias.
   - Em tela menor, empilhar de forma responsiva para não quebrar.
   - Evitar que um card fique gigante e os outros separados abaixo.

3. Padronizar altura e espaçamento
   - Os três cards terão altura e densidade visual parecidas.
   - “Distribuição geral” mostrará:
     - percentual principal de cobertura;
     - linha “Com CIN”;
     - linha “Sem CIN”;
     - totais resumidos no mesmo padrão compacto.
   - “Top 5 — Melhores GREs” e “Top 5 — Prioritárias” continuam com suas listas, mas ajustadas para a mesma altura/densidade do primeiro card.

4. Preservar fonte, cores e terminologia
   - Não alterar fonte.
   - Não alterar paleta.
   - Manter “Ensino Fundamental e Ensino Médio”.
   - Não voltar com “educação básica”.

Arquivos a alterar após aprovação

- `src/components/landing/TerritorialDiagnosis.tsx`
  - Reorganizar os três blocos em uma única grade horizontal.
  - Refatorar “Distribuição geral” para usar o mesmo padrão de card dos rankings.

- `src/styles.css`, somente se necessário
  - Criar uma classe utilitária padronizada para grid de três cards, sem valores soltos improvisados.

Critério de aceite

- Os três blocos aparecem como cards equivalentes.
- Os três ficam um ao lado do outro em desktop/janela larga.
- Nenhum card fica desproporcional, gigante ou jogado para outra linha sem necessidade.
- O bloco “Distribuição geral” deixa de parecer uma seção diferente dos outros dois.