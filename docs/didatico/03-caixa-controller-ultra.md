# 03 - caixaController Ultra Detalhado (PT-BR)

## Papel do controller
`caixaController` é a camada HTTP entre rota e model:
- recebe request.
- valida regras.
- chama model.
- devolve response padronizada.

---

## Função auxiliar: `validarDados`

Valida:
1. obrigatórios: `tipo`, `descricao`, `categoria`, `valor`.
2. `tipo` deve ser `entrada` ou `saida`.
3. `valor` deve ser número > 0.

Retorno:
- string de erro (se inválido).
- `null` (se válido).

---

## `criar(request, response)`

1. Lê body.
2. Valida com `validarDados`.
3. Chama `caixaModel.criar`.
4. Retorna `201` com dados criados.
5. Em exceção, retorna `500`.

---

## `listar(request, response)`

1. Chama `caixaModel.listar`.
2. Retorna `200` com array de movimentações.
3. Erro -> `500`.

---

## `atualizar(request, response)`

1. Lê `id` da URL.
2. Valida `id`.
3. Valida body com `validarDados`.
4. Confirma existência (`buscarPorId`).
5. Atualiza (`caixaModel.atualizar`).
6. Retorna `200`.
7. Erros:
   - `400` para dados inválidos.
   - `404` para não encontrado.
   - `500` para erro interno.

---

## `remover(request, response)`

1. Lê `id`.
2. Valida `id`.
3. Confirma existência.
4. Remove.
5. Retorna `200`.
6. Erros:
   - `400`, `404`, `500`.

---

## `saldo(request, response)`

1. Chama `caixaModel.obterSaldo`.
2. Retorna `200` com:
   - `total_entradas`
   - `total_saidas`
   - `saldo_atual`
3. Em erro, retorna `500`.

---

## Resumo de responsabilidades
Controller NÃO faz SQL direto.
Controller NÃO deve conter regra visual.
Controller organiza:
- validação de entrada.
- status HTTP correto.
- resposta JSON consistente.
