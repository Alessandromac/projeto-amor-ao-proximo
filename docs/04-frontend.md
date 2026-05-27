# 04 - Frontend (React + Vite)

## Estrutura principal

- src/pages: telas (Login, Dashboard, Caixa, Doacoes, Produtos)
- src/routes: rotas do frontend (React Router)
- src/components: componentes reutilizaveis (ex: PrivateRoute)
- src/api/httpClient.js: cliente axios com baseURL da API
- src/styles: organizacao de CSS global e por pagina

## Diferenca entre rotas frontend e backend

- frontend route: troca de tela (ex: /login, /dashboard)
- backend route: operacao de dados (ex: /api/auth/login, /api/gastos)

## Fluxo de login no frontend

1. Usuario preenche email/senha em LoginPage
2. Frontend faz POST /api/auth/login
3. API retorna token + dados do usuario
4. Frontend salva token e usuario no localStorage
5. Usuario navega para /dashboard
6. PrivateRoute protege telas internas

## Fluxo novo de contas de caixa

1. Na tela Caixa, o frontend busca:
- GET /api/contas-caixa
- GET /api/caixa
- GET /api/caixa/saldo
2. Usuario escolhe uma conta (ex: Caixa Euzania) para lancar entrada/saida.
3. Usuario pode filtrar por:
- conta especifica
- todas as contas (Caixa Geral)
- texto de busca
4. API devolve lista filtrada e saldo do filtro selecionado.

## Como consumir API no React (passo a passo)

### 1) Configurar cliente HTTP

Arquivo: src/api/httpClient.js

```js
import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export default httpClient
```

2) Fazer login (POST)
const resposta = await httpClient.post('/auth/login', {
  email,
  senha
});
3) Guardar token
localStorage.setItem('token', resposta.data.token);
4) Enviar token nas proximas chamadas
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`
};

const gastos = await httpClient.get('/gastos', { headers });
5) Tratar erros
try {
  // requisicao
} catch (error) {
  const mensagem = error?.response?.data?.mensagem || 'Erro inesperado';
}
CRUD no frontend (resumo)
GET: listar dados e renderizar lista na tela
POST: enviar formulario para criar registro
PUT: atualizar registro existente
DELETE: excluir registro (com confirmacao)
Boas praticas adotadas
token no header Authorization
rota privada para bloquear acesso sem login
separacao entre pagina e camada HTTP
feedback visual de carregamento e erro
CSS organizado fora do JSX
