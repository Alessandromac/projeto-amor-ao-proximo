# 03 - Backend API

## Tecnologias
- Node.js
- Express
- MySQL
- JWT (autenticacao por token)

## Estrutura principal
- src/routes: define endpoints
- src/controllers: recebe request e devolve response
- src/models: executa SQL no banco
- src/middlewares: autenticacao e permissao

## Fluxo de uma requisicao
1. Frontend envia request (ex: POST /api/gastos)
2. Middleware valida token e perfil
3. Controller valida dados e chama model
4. Model executa SQL no MySQL
5. API devolve response JSON para o frontend

## Conceitos rapidos
- endpoint/route: endereco da API
- request: dados enviados para API
- response: retorno da API
- middleware: etapa antes do controller (ex: validar token)
- token Bearer: credencial enviada no header Authorization
- CRUD: Create, Read, Update, Delete

## Rotas implementadas

### Auth
- POST /api/auth/login
  - recebe: email, senha
  - retorna: token + usuario

### Usuarios
- GET /api/usuarios (admin, viewer)
- POST /api/usuarios (admin)
- PUT /api/usuarios/:id (admin)
- DELETE /api/usuarios/:id (admin)

### Caixa
- GET /api/caixa (admin, viewer)
  - filtros opcionais:
    - conta_id=ID_DA_CONTA ou conta_id=geral
    - busca=texto
- GET /api/caixa/saldo (admin, viewer)
  - filtro opcional:
    - conta_id=ID_DA_CONTA ou conta_id=geral
- POST /api/caixa (admin)
- PUT /api/caixa/:id (admin)
- DELETE /api/caixa/:id (admin)

### Contas de caixa
- GET /api/contas-caixa (admin, viewer)
- POST /api/contas-caixa (admin)
- PUT /api/contas-caixa/:id (admin)

### Gastos
- GET /api/gastos (admin, viewer)
- POST /api/gastos (admin)
- PUT /api/gastos/:id (admin)
- DELETE /api/gastos/:id (admin)

### Produtos e estoque
- GET /api/produtos (admin, viewer)
- POST /api/produtos (admin)
- PUT /api/produtos/:id (admin)
- DELETE /api/produtos/:id (admin)

### Doacoes
- GET /api/doacoes (admin, viewer)
- POST /api/doacoes (admin)
  - para tipo_doacao=dinheiro: enviar conta_caixa_id

## Padrao de headers autenticados
- Authorization: Bearer SEU_TOKEN

## Status HTTP mais usados
- 200: sucesso
- 201: criado com sucesso
- 400: dados invalidos
- 401: token ausente/invalido
- 403: sem permissao para o perfil
- 404: nao encontrado
- 409: conflito (ex: email/SKU duplicado)
- 500: erro interno
