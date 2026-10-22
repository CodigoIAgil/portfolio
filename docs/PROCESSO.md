# Processo de desenvolvimento

## Princípio

Ninguém faz, julga e aprova ao mesmo tempo.

| Papel                | Quem                | O que faz                                                       |
| -------------------- | ------------------- | --------------------------------------------------------------- |
| Executa              | você ou o Claude    | código na branch, commits, abertura do PR                       |
| Valida               | GitHub Actions (CI) | `npm run check` + gitleaks, num ambiente que ninguém administra |
| Decide e faz o merge | você                | revisa o PR e faz o squash merge com o CI verde                 |

## Ciclo de uma mudança

```bash
# 1. Partir da main atualizada
git switch main
git pull

# 2. Criar a branch da tarefa
git switch -c feat/menu-responsivo

# 3. Trabalhar e commitar (o pre-commit roda sozinho)
git add .
git commit -m "feat: menu vira hambúrguer abaixo de 768px"

# 4. Enviar e abrir o PR
git push
gh pr create --fill

# 5. Acompanhar o CI
gh pr checks --watch

# 6. Com o CI verde: revisar e fazer o merge (squash; a branch é apagada)
gh pr merge --squash

# 7. Voltar para a main atualizada
git switch main
git pull
```

## Nomes de branch e de commit

| Prefixo  | Quando usar                 |
| -------- | --------------------------- |
| `feat/`  | funcionalidade nova         |
| `fix/`   | correção                    |
| `docs/`  | só documentação             |
| `chore/` | configuração e dependências |

Mensagem de commit: `tipo: descrição curta no imperativo`.
Exemplo: `fix: corrige o alinhamento do rodapé no celular`.

## O que acontece se eu errar

| Situação                            | O que barra                                                           |
| ----------------------------------- | --------------------------------------------------------------------- |
| Commit com senha ou token           | gitleaks no pre-commit; o push protection do GitHub; o gitleaks no CI |
| Push direto na `main`               | ruleset `protege-main` (rejeita o push)                               |
| HTML inválido ou CSS fora do padrão | `npm run check` no pre-commit e no CI; o merge fica bloqueado         |
| Arquivo grande (> 500 KB)           | `check-added-large-files` no pre-commit                               |
| Dependência com vulnerabilidade     | Dependabot abre o alerta e o PR de correção                           |

## Nunca

- `git commit --no-verify` (pula os hooks)
- `git push --force` na `main` (o ruleset bloqueia)
- Colocar segredo no código. Se vazar: **revogue o segredo primeiro**; só depois limpe o histórico.
