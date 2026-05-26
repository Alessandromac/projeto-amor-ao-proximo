# 07 - PrivateRoute Ultra Detalhado (PT-BR)

## Objetivo
Proteger páginas no frontend.

## Fluxo
1. Verifica token no localStorage.
2. Se existe token -> renderiza children.
3. Se não existe -> `Navigate` para `/login`.

## Limite importante
PrivateRoute valida presença de token local.
Validação real de segurança é no backend (JWT).
