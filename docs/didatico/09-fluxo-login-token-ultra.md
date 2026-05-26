# 09 - Fluxo Login/Token ponta a ponta (PT-BR)

## 1) Frontend envia login
`POST /api/auth/login` com email/senha.

## 2) Backend valida usuário
- busca por email.
- compara senha com hash (`bcrypt`).
- verifica se está ativo.

## 3) Backend gera token JWT
Token inclui payload mínimo (id, email, perfil).

## 4) Frontend salva sessão
Salva `token` e `usuario` no localStorage.

## 5) Frontend acessa rota protegida
Envia `Authorization: Bearer <token>`.

## 6) Backend valida token em cada requisição
`authMiddleware` valida assinatura e expiração.

## 7) Middleware de perfil decide permissão
`perfilMiddleware` libera ou bloqueia por perfil.
