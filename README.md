# Portfólio

Site de página única (HTML e CSS): o projeto dos módulos 4 e 5 do curso **Sujeito Programador**.

**No ar:** https://codigoiagil.github.io/portfolio/

## O que tem

- Menu fixo no topo (`position: sticky`) com navegação por âncoras e rolagem suave.
- Hero de tela inteira (`calc(100vh - 80px)`) com botão que cresce no hover.
- Seções Sobre e Projetos, e rodapé.
- Responsivo: abaixo de 1050px o Sobre e o rodapé empilham, os textos diminuem e as imagens crescem.

## Diferenças em relação ao código da aula

Todas vêm da seção ⚠️ das notas de estudo:

| Aula                                    | Aqui                                             | Por quê                                                   |
| --------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `<a><button>…</button></a>`             | link estilizado como botão (`a.call-to-action`)  | `<button>` dentro de `<a>` é HTML inválido                |
| `outline: 0` no reset                   | removido, com foco visível (`:focus-visible`)    | acessibilidade para quem navega pelo teclado              |
| `background-size: cover` só no `@media` | também na regra base do `.main`                  | a foto não repete em telas grandes                        |
| seções escondidas sob o menu            | `section { scroll-margin-top: 80px; }`           | o menu sticky cobria o título ao navegar                  |
| sem tratamento de movimento             | `prefers-reduced-motion` desliga a rolagem suave | respeita a configuração do sistema                        |
| `<nav>` solto                           | `<header><nav>…</nav></header>` e `<main>`       | HTML semântico (módulo 2)                                 |
| `@media (max-width: 1050px)`            | `@media (width <= 1050px)`                       | sintaxe de intervalo exigida pelo stylelint; mesmo efeito |

As imagens em `images/` são ilustrações SVG provisórias. Troque pelas suas, mantendo os nomes ou ajustando o HTML.

## Desenvolvimento

Siga o fluxo de [docs/PROCESSO.md](docs/PROCESSO.md). Comandos: `npm run check`, `npm run format` e `pre-commit run -a`.
