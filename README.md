# web-projeto-template

Modelo para projetos web (HTML, CSS e JS) com o processo de desenvolvimento seguro já pronto:
lint, formatação, varredura de segredos, CI obrigatório e deploy no GitHub Pages.

## Criar um projeto novo a partir deste modelo

```bash
cd /c/dev
gh repo create CodigoIAgil/NOME-DO-PROJETO --public --template CodigoIAgil/web-projeto-template --clone
cd NOME-DO-PROJETO
npm ci
pre-commit install
bash scripts/proteger-repo.sh CodigoIAgil/NOME-DO-PROJETO
```

Depois, troque o `name` no `package.json` e o título no `README.md` e no `index.html`.

## Comandos

| Comando             | O que faz                                                      |
| ------------------- | -------------------------------------------------------------- |
| `npm run check`     | roda o lint de HTML e CSS e confere a formatação (igual ao CI) |
| `npm run format`    | formata todos os arquivos com o Prettier                       |
| `pre-commit run -a` | roda todos os hooks locais em todos os arquivos                |

## O processo

O passo a passo do dia a dia está em [docs/PROCESSO.md](docs/PROCESSO.md).
