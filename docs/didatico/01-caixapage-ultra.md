# 01 - CaixaPage Ultra Detalhado (PT-BR)

## Visão geral da tela
A `CaixaPage` é a tela que centraliza os lançamentos financeiros.
Ela trata:
1. Entradas (via fluxo de doação).
2. Saídas (via lançamento direto no caixa).
3. Listagem/edição/exclusão de movimentações.

---

## Importações

`import { useCallback, useEffect, useState } from 'react'`  
Importa hooks React:
- `useState`: estado da tela.
- `useEffect`: efeitos colaterais (ex.: carregar API).
- `useCallback`: mantém referência estável de funções.

`import { Link, useNavigate } from 'react-router-dom'`  
- `Link`: navegação declarativa.
- `useNavigate`: navegação imperativa por código.

`import httpClient from '../api/httpClient'`  
Cliente HTTP configurado para falar com backend.

---

## Constantes de domínio

`const CATEGORIAS = [...]`  
Categorias de gastos/saídas.

`const TIPOS_DOACAO = [...]`  
Tipos de doação aceitos para entrada:
- dinheiro
- alimentos
- vestuario
- higiene

---

## Função utilitária de data

`function paraInputDateTime(valor) { ... }`  
Converte data da API para formato do input `datetime-local`.

- `if (!valor) return ''`: evita erro com valor vazio.
- `new Date(valor)`: transforma string em data.
- ajuste de timezone: evita “deslocamento” no campo.
- `toISOString().slice(0, 16)`: padrão `YYYY-MM-DDTHH:mm`.

---

## Estados da página

`movimentacoes`: lista de lançamentos de caixa.  
`produtos`: lista usada para doação de itens.  
`carregando`: loading inicial da tela.  
`erro`: mensagem de erro para UI.  
`salvando`: trava botão no submit.  
`editandoId`: define modo edição (id) ou criação (`null`).  

Campos do formulário:
- `tipo`: entrada/saida.
- `tipoDoacao`: dinheiro/alimentos/vestuario/higiene.
- `descricao`: texto livre.
- `categoria`: categoria da saída.
- `valor`: valor monetário.
- `produtoId`: produto selecionado para doação de item.
- `quantidade`: qtd de item.
- `dataMovimento`: data/hora da saída.

---

## Funções auxiliares da tela

### `sair`
1. Remove `token` e `usuario` do `localStorage`.
2. Redireciona para `/login`.

### `obterHeaders`
1. Lê token.
2. Retorna `{ Authorization: 'Bearer <token>' }`.

### `limparFormulario`
Reseta formulário para estado inicial.

---

## Carregamento de dados

### `carregarMovimentacoes`
`GET /caixa` e atualiza estado `movimentacoes`.

### `carregarProdutos`
`GET /produtos` e atualiza estado `produtos`.

---

## useEffect inicial

Objetivo:
- validar sessão.
- buscar dados de caixa e produtos em paralelo.
- tratar erros de autenticação.

Fluxo:
1. `token` ausente -> redireciona login.
2. `Promise.all` para carregar `caixa` e `produtos`.
3. atualiza estados.
4. no `catch`, trata 401 e erros gerais.
5. no `finally`, desativa loading.
6. no cleanup, evita atualização após desmontar.

---

## `handleSubmit` (regra principal)

### Cenário A: `tipo === 'entrada'`
Envia para rota de doação (`POST /doacoes`):
- sempre envia `tipo_doacao` e `descricao`.
- se dinheiro: envia `valor`.
- se item: envia `produto_id` + `quantidade`.
- valor estimado opcional para item (se informado).

### Cenário B: `tipo === 'saida'`
Envia para rota de caixa:
- edição -> `PUT /caixa/:id`.
- novo -> `POST /caixa`.
- payload inclui: tipo, descricao, categoria, valor, data_movimento.

Após sucesso:
1. limpa formulário.
2. recarrega dados da tela.

---

## Edição e exclusão

### `iniciarEdicao(item)`
Preenche campos com dados do item selecionado.

### `excluirMovimentacao(id)`
1. pede confirmação (`window.confirm`).
2. chama `DELETE /caixa/:id`.
3. recarrega lista.

---

## Renderização condicional

No formulário:
- se `tipo=entrada`:
  - mostra tipo de doação.
  - dinheiro -> campo valor obrigatório.
  - item -> produto + quantidade + valor opcional.
- se `tipo=saida`:
  - mostra descrição, categoria, valor e data/hora.

Na listagem:
- mostra histórico de movimentações.
- botões de editar e excluir por item.
