# 05 - Como Testar

## 1) Subir backend
Terminal 1:
```bash
cd backend
npm run dev
Subir frontend
cd frontend
npm run dev

{
  "email": "admin@controlecaixa.com",
  "senha": "123456"
}
Esperado:

token JWT no retorno
Usar token
Header:

Authorization: Bearer SEU_TOKEN
Testes principais
GET /api/usuarios
POST /api/caixa
GET /api/caixa/saldo
CRUD /api/gastos
CRUD /api/produtos
POST /api/estoque/movimentar
GET /api/estoque/movimentacoes
4) Testar frontend
Abrir /login
Fazer login
Conferir dashboard com dados reais
Testar CRUD de gastos na tela
Testar CRUD de produtos na tela
Testar movimentacao de estoque
5) Teste de permissao
login como viewer:
pode consultar/listar
nao pode criar/editar/excluir (retorno 403)
6) Teste de protecao de rota
remover token do localStorage
tentar abrir /dashboard
esperado: redirecionar para /login
