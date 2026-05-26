# 05 - authMiddleware Ultra Detalhado (PT-BR)

## Objetivo
Garantir que somente usuários autenticados acessem rotas privadas da API.

## Fluxo
1. Lê header `Authorization`.
2. Valida formato `Bearer <token>`.
3. Verifica token com `JWT_SECRET`.
4. Injeta payload em `request.usuario`.
5. Se inválido/ausente, responde 401.

## Observação
Middleware roda antes do controller; se falhar, controller nem executa.
