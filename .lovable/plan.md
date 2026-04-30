## Objetivo

Substituir as duas imagens geradas por IA (Hero e CallToAction) pelas fotos oficiais reais da rede estadual do Piauí enviadas pelo usuário. As imagens atuais usam um uniforme cinza/azul que não corresponde ao uniforme real da SEDUC-PI (camisa branca com detalhes verdes, brasão do Governo do Piauí e faixa colorida nas mangas, calça verde).

## Análise das 5 imagens recebidas

| Arquivo | Conteúdo | Uso recomendado |
|---|---|---|
| `transferir_4.jpg` | Sala de aula tradicional, alunos do ensino médio fazendo prova, uniforme oficial completo, luz natural, ambiente escolar real | **Hero** — comunica "estudante da rede" de forma direta e institucional |
| `transferir_3.jpg` | Laboratório de informática, aluna sorrindo, uniforme oficial em primeiro plano (brasão visível) | **CallToAction** — rosto positivo, conecta com mensagem de cidadania/identidade |
| `transferir_2.jpg` | Sala com Chromebooks, professor + alunos, uniforme com logo "Governo PIAUÍ / SEDUC" | Reserva (poderia ser usada em seção secundária no futuro) |
| `transferir_1.jpg` | Auditório, estudantes celebrando em evento Pró-ENEM, energia coletiva | Reserva |
| `transferir.jpg` | Aluna com medalha do TME² (Torneio de Matemática) | Reserva |

Para esta entrega, usar as duas primeiras (4 e 3). As outras três ficam disponíveis em `src/assets/` para uso futuro sem precisar reupload.

## Mudanças

### Assets
- Copiar `user-uploads://transferir_4.jpg` → `src/assets/aluno-rede-estadual-pi.jpg` (substitui a imagem gerada por IA)
- Copiar `user-uploads://transferir_3.jpg` → `src/assets/aluno-cin-piaui.jpg` (substitui a imagem gerada por IA)
- Copiar as outras 3 como reserva institucional:
  - `transferir_2.jpg` → `src/assets/alunos-laboratorio-pi.jpg`
  - `transferir_1.jpg` → `src/assets/alunos-evento-pi.jpg`
  - `transferir.jpg` → `src/assets/aluna-tme-pi.jpg`

### Ajustes finos nos componentes que consomem
- `Hero.tsx`: o overlay atual é `from-primary/75 via-primary/25 to-transparent`. Como `transferir_4.jpg` tem muita luz e azul nas cadeiras, reduzir o overlay para `from-primary/55 via-primary/15 to-transparent` para preservar o realismo da foto. Ajustar o `alt` para "Estudantes da rede estadual do Piauí em sala de aula com uniforme oficial do Governo do Estado".
- `CallToAction.tsx`: o overlay atual é `from-[oklch(...)]/95 via-primary/85 to-accent/80` — está muito opaco. Como `transferir_3.jpg` tem rosto sorridente que vale a pena deixar visível à direita, mudar para gradiente direcional `from-primary/90 via-primary/70 to-primary/30` (mais leve no lado direito). Atualizar o `alt`.

### Não mexer
- Sem mudanças em estrutura de seções, cores, espaçamentos, tipografia ou tokens.
- Sem mudanças nos cálculos / dados.

## Critérios de aceite

- Hero e CTA exibem fotos reais de estudantes da rede estadual do PI com uniforme oficial reconhecível.
- Lado direito do CTA mantém o rosto da aluna parcialmente visível (overlay mais leve à direita).
- Hero mantém legibilidade do texto sobreposto inferior.
- 3 imagens extras ficam disponíveis em `src/assets/` para uso futuro.
- Build TanStack passa sem erro.
