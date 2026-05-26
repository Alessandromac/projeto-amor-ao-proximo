# 04 - doacaoController Ultra Detalhado (PT-BR)

## Papel do controller de doações
Processar regras de doação no nível HTTP.

Tipos válidos:
- dinheiro
- alimentos
- vestuario
- higiene

---

## Constantes de regra

`TIPOS_VALIDOS`:
Lista de valores permitidos no campo `tipo_doacao`.

`TIPOS_ITEM`:
Subconjunto que exige produto e quantidade:
- alimentos
- vestuario
- higiene

---

## `criar(request, response)`

### Etapa 1: leitura de dados
Lê:
- `tipo_doacao`
- `descricao`
- `valor`
- `produto_id`
- `quantidade`
- `data_doacao`

### Etapa 2: validações gerais
- `tipo_doacao` e `descricao` obrigatórios.
- tipo precisa estar em `TIPOS_VALIDOS`.

### Etapa 3: validações por tipo

Se `tipo_doacao = dinheiro`:
- `valor` obrigatório e > 0.

Se `tipo_doacao` for item:
- `produto_id` obrigatório.
- `quantidade` obrigatória e > 0.

### Etapa 4: persistência
Chama `doacaoModel.criar` com dados + `usuarioId` da sessão.

### Etapa 5: resposta
- sucesso: `201`.
- produto inexistente: `404`.
- erro interno: `500`.

---

## `listar(request, response)`

1. Chama `doacaoModel.listar`.
2. Retorna `200` com array de doações.
3. Erro interno -> `500`.

---

## Boas práticas observadas

1. Validação de domínio no controller.
2. Mensagens claras de erro para frontend.
3. Separação de responsabilidades:
   - controller valida e responde
   - model persiste e consulta
4. Uso correto de códigos HTTP:
   - 200, 201, 400, 404, 500.
