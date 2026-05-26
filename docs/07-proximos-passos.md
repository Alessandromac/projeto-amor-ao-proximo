# 07 - Proximos Passos

## 1) Melhorar seguranca
- hash de senha ja implementado (bcrypt)
- evoluir JWT com refresh token
- adicionar logout no backend (blacklist opcional)
- limitar tentativas de login (rate limit)

## 2) Melhorar modelagem de dados
- soft delete para produtos e usuarios (inativar ao inves de excluir)
- auditoria de alteracoes (quem alterou e quando)
- categorias de gastos em tabela propria

## 3) Melhorar frontend
- componentizar layout (Header, Nav, Card, FormField, Table)
- criar sistema de notificacao (toast)
- padronizar feedback de carregamento/erro
- finalizar responsividade mobile-first em todas as telas

## 4) Melhorar UX
- mascaras de moeda e data
- formatacao pt-BR de valores
- filtros por periodo (caixa/gastos)
- busca de produtos por nome/SKU

## 5) Qualidade de codigo
- adicionar testes automatizados backend (Jest/Supertest)
- adicionar testes frontend (React Testing Library)
- configurar lint + format (ESLint + Prettier) com scripts

## 6) Deploy
- backend: Render/Railway/Fly.io
- banco: MySQL gerenciado
- frontend: Vercel/Netlify
- configurar variaveis de ambiente em producao

## 7) Evolucao para mobile
- reaproveitar API atual
- criar app React Native consumindo os mesmos endpoints
- manter auth JWT e regras de permissao

## 8) Checklist final de aprendizado
- entender request/response e status HTTP
- entender fluxo token -> middleware -> permissao
- entender CRUD completo no frontend e backend
- entender como dados saem da tela, passam pela API, vao ao banco e retornam para a tela