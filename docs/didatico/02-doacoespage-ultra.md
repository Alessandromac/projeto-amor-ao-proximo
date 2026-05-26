# 02 - DoacoesPage Ultra Detalhado (PT-BR)

## Objetivo da tela
Registrar e listar doações, separando:
1. doação em dinheiro.
2. doação de itens (alimentos, vestuário, higiene).

---

## Estrutura geral

A tela tem 2 blocos:
1. Formulário de cadastro de doação.
2. Histórico de doações.

---

## Importações

`useState`, `useEffect`, `useCallback`:
- controlam estados e efeitos da tela.

`Link`, `useNavigate`:
- navegação entre rotas.

`httpClient`:
- chamadas na API.

---

## Tipos de doação

`TIPOS` define as opções do select:
- dinheiro
- alimentos
- vestuario
- higiene

---

## Estados

Campos de formulário:
- `tipoDoacao`
- `descricao`
- `valor`
- `produtoId`
- `quantidade`

Dados carregados:
- `produtos`
- `doacoes`

Controle de UX:
- `carregando`
- `salvando`
- `erro`
- `info`

`ehDinheiro`:
- booleano derivado para renderização condicional.

---

## Funções

### `sair`
Logout + redirecionamento.

### `obterHeaders`
Monta Bearer token para endpoints protegidos.

### `limparFormulario`
Reseta campos do form.

### `carregarDados`
Carrega:
1. `GET /doacoes`
2. `GET /produtos`
Em paralelo com `Promise.all`.

---

## useEffect inicial

1. Verifica token.
2. Se inválido/ausente -> login.
3. Chama `carregarDados`.
4. Atualiza mensagens e loading.
5. Faz cleanup com flag `ativo`.

---

## Submit (`handleSubmit`)

1. Monta payload base:
   - `tipo_doacao`
   - `descricao`
2. Se dinheiro:
   - adiciona `valor`.
3. Se item:
   - adiciona `produto_id` e `quantidade`.
4. Envia `POST /doacoes`.
5. Exibe sucesso, limpa formulário e recarrega dados.

Tratamento de erro:
- 401 -> logout.
- demais -> mensagem amigável.

---

## Renderização condicional

### Campo dinâmico por tipo
- dinheiro -> exibe input de valor.
- item -> exibe select de produto + quantidade.

### Histórico
Exibe:
- data
- tipo
- descrição
- valor (dinheiro) OU quantidade + produto (itens)
