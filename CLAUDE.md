# CLAUDE.md — regras deste repositório

- **Nunca** commitar nem dar push direto na `main`. Todo trabalho acontece em uma branch
  `feat/…`, `fix/…`, `docs/…` ou `chore/…` e chega à `main` só por Pull Request.
- Commits no padrão Conventional Commits (`feat: …`, `fix: …`, `docs: …`, `chore: …`).
- Antes de abrir o PR: rodar `npm run check` e mostrar a saída. Nunca usar `--no-verify`.
- Abrir o PR com `gh pr create`, preenchendo o template (seções **Executado** e **Visão Complementar**).
- **Quem faz o merge é o dono do repositório**, depois do CI verde. A IA não aprova nem faz merge.
- Nunca colocar segredos, senhas ou tokens no código. Configuração sensível fica em `.env`
  (ignorado pelo Git), com exemplo falso em `.env.example`.
- Decisão de rumo (design, escopo, nova dependência): parar e perguntar.
