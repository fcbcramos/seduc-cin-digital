
# Ajustes institucionais — Topbar + Brasão oficial Governo do Piauí

Aplicar ao topo da landing dois elementos do padrão visual do portal seduc.pi.gov.br para reforçar a identidade institucional, usando o brasão oficial enviado.

## Mudanças

### 1. Salvar logo oficial
Logo já copiada para `src/assets/governo-piaui.png` (brasão "Governo do Piauí — Aqui tem trabalho. Aqui tem futuro.").

### 2. Novo componente `TopBar.tsx`
Faixa fina azul-escura no topo da página (espelha o padrão do portal SEDUC-PI):
- Esquerda: links "Ouvidoria" e "Portal SEDUC-PI"
- Direita: e-mail institucional e telefone `(86) 3216-3200`
- Cor: azul institucional escuro (já presente como token), texto branco, hover amarelo (`secondary`)
- Tamanho: `text-xs`, `py-2`

### 3. Novo componente `InstitutionalHeader.tsx`
Barra branca abaixo da TopBar com a assinatura oficial:
- Texto à esquerda: "SECRETARIA / da Educação — SEDUC" (escala tipográfica do portal)
- Separador vertical
- À direita: brasão `governo-piaui.png` (altura ~48–56px)
- Fundo: `bg-card`, borda inferior sutil

### 4. Hero atualizado (`Hero.tsx`)
- Remover o badge textual "SEDUC-PI" do hero (agora redundante com o header institucional acima)
- Manter os badges "Projeto Institucional" e "Em execução"
- Reduzir o padding superior do hero (`py-10` em vez de `py-12`) já que agora há cabeçalho institucional acima

### 5. Composição em `src/routes/index.tsx`
Ordem de renderização:
```text
<TopBar />
<InstitutionalHeader />
<Hero />
<main>...</main>
<Footer />
```

### 6. Footer atualizado (`Footer.tsx`)
Adicionar o brasão oficial também no rodapé (versão pequena à esquerda) para fechar a identidade visual.

## Detalhes técnicos
- Logo importada via ES6 module a partir de `@/assets/governo-piaui.png` (bundling Vite, otimização automática).
- Sem novas dependências.
- Sem novos tokens — reutiliza paleta institucional já existente em `src/styles.css`.
- `alt` text descritivo no brasão para acessibilidade.
- Responsivo: TopBar oculta itens secundários em mobile (`sm:hidden`/`sm:inline`), InstitutionalHeader mantém logo visível em todas as resoluções.

## Fora de escopo
- Menu de navegação institucional ("Início | Institucional | Diretrizes | Serviços | Acesso rápido") — esta é uma landing single-page, não faz sentido replicar a navegação completa do portal.
- Campo de busca global do portal — não se aplica a uma landing executiva.
