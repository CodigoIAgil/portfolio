# Portfólio CódigoIAgil

Site de página única (HTML e CSS) com a identidade **CódigoIAgil**: desenvolvimento ágil com IA.
Nasceu como o projeto dos módulos 4 e 5 do curso **Sujeito Programador**.

**No ar:** https://codigoiagil.github.io/portfolio/

## O que tem

- Menu fixo no topo (`position: sticky`) com navegação por âncoras e rolagem suave.
- Hero de tela inteira (`calc(100vh - 80px)`) com botão que cresce no hover.
- Seções Sobre, Do pensamento ao código e Projetos, e rodapé.
- Responsivo: abaixo de 1050px o Sobre e o rodapé empilham, os textos diminuem e as imagens crescem.

## Identidade visual

O logo representa um **cérebro** (os cubos) conectado por **neurônios** (os pontos laranja). O **losango laranja**
é a IA entregando ao cérebro o **código pensado** (o padrão de "x" atrás do nome). O site segue essa ideia:

| Elemento do logo   | No site                                                                        |
| ------------------ | ------------------------------------------------------------------------------ |
| Logo completo      | marca d'água fixa no centro da tela; o conteúdo rola por cima (`body::before`) |
| Losango laranja    | marcador dos títulos, botões e ícone "Codar"                                   |
| Neurônios          | divisores entre seções, ponto pulsante no hero, ícone "Conectar"               |
| Cérebro (cubos)    | ícone "Pensar"                                                                 |
| Símbolo sem o nome | favicon (`images/favicon-32.png` e `images/apple-touch-icon.png`)              |

Cores tiradas do próprio logo: fundo `#1e1e1e`, laranja `#f97316` e cinza `#c4c4c4`.
A intensidade da marca d'água fica na variável `--marca-dagua-opacidade` (no topo do `styles.css`).

A marca d'água e os favicons foram gerados a partir de `CódigoIÁgil_Logo.png`, apenas recortados e reduzidos (sem alterar cores nem proporções).

## Diferenças em relação ao código da aula

Todas vêm da seção ⚠️ das notas de estudo:

| Aula                         | Aqui                                             | Por quê                                                   |
| ---------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `<a><button>…</button></a>`  | link estilizado como botão (`a.call-to-action`)  | `<button>` dentro de `<a>` é HTML inválido                |
| `outline: 0` no reset        | removido, com foco visível (`:focus-visible`)    | acessibilidade para quem navega pelo teclado              |
| seções escondidas sob o menu | `section { scroll-margin-top: 80px; }`           | o menu sticky cobria o título ao navegar                  |
| sem tratamento de movimento  | `prefers-reduced-motion` desliga a rolagem suave | respeita a configuração do sistema                        |
| `<nav>` solto                | `<header><nav>…</nav></header>` e `<main>`       | HTML semântico (módulo 2)                                 |
| `@media (max-width: 1050px)` | `@media (width <= 1050px)`                       | sintaxe de intervalo exigida pelo stylelint; mesmo efeito |

As imagens dos projetos e a ilustração do Sobre (`images/*.svg`) são provisórias. Troque pelas suas, mantendo os nomes ou ajustando o HTML.

## Desenvolvimento

Siga o fluxo de [docs/PROCESSO.md](docs/PROCESSO.md). Comandos: `npm run check`, `npm run format` e `pre-commit run -a`.
