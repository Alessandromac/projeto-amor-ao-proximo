# 06 - perfilMiddleware Ultra Detalhado (PT-BR)

## Objetivo
Controlar permissão por perfil (ex.: `admin`, `viewer`).

## Fluxo
1. Recebe perfis permitidos como parâmetro.
2. Lê `request.usuario.perfil` (definido pelo authMiddleware).
3. Se perfil permitido -> `next()`.
4. Se não permitido -> 403.

## Resultado
Evita que usuário sem permissão faça ações de escrita.
