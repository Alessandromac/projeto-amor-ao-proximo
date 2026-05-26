# Guia Didático Completo (PT-BR)

Este arquivo reúne explicações do projeto em linguagem didática.

Estrutura:
1. Frontend
2. Backend
3. Banco de dados
4. Fluxo completo

---

## 1) Frontend

### 1.1 `src/main.jsx`
- Ponto de entrada da aplicação React.
- Renderiza o componente raiz (`App`) dentro de `#root`.
- É aqui que os estilos globais normalmente são importados.

### 1.2 `src/App.jsx`
- Componente raiz visual/lógico do frontend.
- Normalmente delega para o componente de rotas (`AppRoutes`).
- Serve como “casca” principal da aplicação.

### 1.3 `src/routes/AppRoutes.jsx`
- Define todas as rotas do app (`/login`, `/dashboard`, `/caixa`, `/doacoes`, `/produtos`).
- Usa `PrivateRoute` para proteger páginas autenticadas.
- Redireciona rotas inválidas para login.

### 1.4 `src/components/PrivateRoute.jsx`
- Verifica se existe token no `localStorage`.
- Se tiver token: renderiza a página protegida.
- Se não tiver: redireciona para `/login`.

### 1.5 `src/api/httpClient.js`
- Centraliza configuração do Axios.
- Define `baseURL` da API.
- Pode usar `import.meta.env` (`VITE_API_BASE_URL`) para web/mobile.

### 1.6 `src/pages/LoginPage.jsx`
- Tela de autenticação.
- Envia email/senha para `/api/auth/login`.
- Salva `token` e `usuario` no `localStorage`.
- Redireciona para `/dashboard` quando login é válido.

### 1.7 `src/pages/DashboardPage.jsx`
- Exibe resumo de caixa:
  - total de entradas
  - total de saídas
  - saldo atual
- Lista últimas movimentações.
- Faz atualização periódica (polling) para manter dados atualizados.

### 1.8 `src/pages/CaixaPage.jsx`
- Tela para lançamentos de caixa.
- Regra atual:
  - `entrada`: usa fluxo de doação
  - `saida`: lança direto no caixa
- Formulário muda dinamicamente conforme tipo selecionado.
- Permite listar, editar e excluir movimentações.

### 1.9 `src/pages/DoacoesPage.jsx`
- Registra doações por tipo:
  - dinheiro
  - alimentos
  - vestuário
  - higiene
- Se dinheiro: pode impactar caixa.
- Se item: seleciona produto e quantidade para movimentar estoque.
- Lista histórico de doações.

### 1.10 `src/pages/ProdutosPage.jsx`
- CRUD de produtos.
- Mantém cadastro base de estoque:
  - nome
  - SKU
  - unidade
  - estoque mínimo
- Exibe estoque atual.

### 1.11 `src/styles/global.css`
- Define variáveis globais (`:root`) de cor e espaçamento.
- Padroniza botões, cards, inputs e layout.
- Regras responsivas para telas pequenas.

### 1.12 `src/styles/pages/*.css` e `src/styles/components/*.css`
- Estilos específicos por tela/componente.
- Mantém organização visual separada do JS/JSX.

---

## 2) Backend

### 2.1 `backend/src/server.js`
- Arquivo que inicia o servidor (`app.listen`).
- Define porta via `.env` (`PORT`).

### 2.2 `backend/src/app.js`
- Configura Express:
  - `cors()`
  - `express.json()`
- Registra rotas dos módulos:
  - auth
  - usuários
  - caixa
  - doações
  - produtos
  - estoque
- Expõe endpoints de health check:
  - `/health`
  - `/health/db`

### 2.3 `backend/src/config/db.js`
- Cria pool de conexão MySQL (`mysql2/promise`).
- Usa variáveis do `.env`:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`

### 2.4 Middlewares

#### `middlewares/authMiddleware.js`
- Lê header `Authorization: Bearer <token>`.
- Valida token JWT.
- Injeta usuário autenticado em `request.usuario`.

#### `middlewares/perfilMiddleware.js`
- Autoriza acesso por perfil (`admin`, `viewer`).
- Bloqueia operações sem permissão (403).

### 2.5 Controllers
- Camada que recebe request e devolve response.
- Faz validações de entrada.
- Chama model para persistir/consultar dados.
- Retorna status HTTP e JSON padronizado.

Principais:
- `authController.js` (login)
- `usuarioController.js` (CRUD usuários)
- `caixaController.js` (CRUD caixa + saldo)
- `doacaoController.js` (registro/lista de doações)
- `produtoController.js` (CRUD produtos)
- `estoqueController.js` (movimentação/lista estoque)

### 2.6 Models
- Camada que executa SQL no banco.
- Não deveria conter regra de interface.
- Retorna dados “crus” para o controller.

Principais:
- `usuarioModel.js`
- `caixaModel.js`
- `doacaoModel.js`
- `produtoModel.js`
- `estoqueModel.js`

### 2.7 Rotas
- Mapeiam URL + método HTTP para controller.
- Exemplo:
  - `GET /api/caixa` -> listar
  - `POST /api/caixa` -> criar
  - `PUT /api/caixa/:id` -> atualizar
  - `DELETE /api/caixa/:id` -> remover

---

## 3) Banco de dados

### 3.1 `backend/database/schema.sql`
- Script de criação de tabelas.
- Estrutura principal:
  - `usuarios`
  - `movimentacoes_caixa`
  - `doacoes`
  - `produtos`
  - `movimentacoes_estoque`
- Usa chaves estrangeiras para integridade:
  - usuário relacionado a lançamentos/doações
  - produto relacionado a doação/estoque

### 3.2 Regras de negócio atuais
- Entrada de dinheiro via doação pode entrar no caixa.
- Doação de itens entra no estoque por produto/quantidade.
- Saídas financeiras são lançadas em caixa.

---

## 4) Fluxo completo (Frontend -> API -> Banco -> API -> Frontend)

1. Usuário preenche formulário na tela React.
2. React envia requisição HTTP para endpoint da API.
3. Controller valida dados e permissões.
4. Model executa SQL no MySQL.
5. Controller retorna JSON com resultado.
6. React atualiza estado e re-renderiza tela.

---

## 5) Glossário técnico (simples)

- Frontend: parte visual que o usuário usa.
- Backend: servidor com regras e segurança.
- API: ponte de comunicação frontend/backend.
- Endpoint: endereço específico da API.
- CRUD: criar, listar, editar, excluir.
- Request: requisição enviada.
- Response: resposta recebida.
- Middleware: filtro/interceptor entre request e controller.
- Model: camada de banco de dados.
- Controller: camada de regra HTTP.
- JWT Token: chave de sessão/autenticação.
- Async/Await: forma de lidar com operações assíncronas sem travar.

---

## 6) Próximos passos didáticos recomendados

1. Padronizar respostas de erro no backend.
2. Criar validação de formulário no frontend (mensagens por campo).
3. Melhorar responsividade mobile em todas as páginas.
4. Criar testes de API (Postman Collection + script de testes).
5. Versionar e revisar branches Git com fluxo de feature.

