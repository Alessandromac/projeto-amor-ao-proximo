# 06 - Erros Comuns

## 1) ECONNREFUSED (frontend ou postman)
### Sintoma
- "connect ECONNREFUSED 127.0.0.1:3001"
### Causa
- backend parado
### Solucao
```bash
cd backend
npm run dev

2) Token invalido ou expirado
Sintoma
401 "Token invalido ou expirado"
Causa
token antigo, com aspas ou incompleto
Solucao
Fazer login novamente
Copiar token sem aspas
Enviar em Authorization Bearer Token
3) Acesso negado para este perfil
Sintoma
403
Causa
usuario viewer tentando alterar dados
Solucao
usar usuario admin para POST/PUT/DELETE
4) Module not found
Sintoma
"Cannot find module ..."
Causa
arquivo nao criado/salvo no caminho certo
Solucao
conferir estrutura de pastas
conferir import e nome exato do arquivo
5) EADDRINUSE porta 3001
Sintoma
"address already in use"
Causa
outro processo node usando a porta
Solucao (Windows)
Get-Process node | Stop-Process -Force
npm run dev
6) React Hook missing dependency
Sintoma
aviso do eslint em useEffect
Causa
dependencia nao listada no array do effect
Solucao
ajustar dependencias do useEffect
evitar setState sincronamente dentro de effect quando necessario
7) ENOTFOUND no host MySQL
Sintoma
"getaddrinfo ENOTFOUND ..."
Causa
DB_HOST incorreto
Solucao
corrigir host no .env com endereco real do MySQL
8) 409 conflito (email/SKU duplicado)
Sintoma
409 em cadastro
Causa
campo unico repetido
Solucao
usar outro email/SKU
9) erro ao excluir produto
Sintoma
falha ao excluir
Causa
produto com movimentacoes relacionadas
Solucao
remover dependencias antes ou manter produto inativo (evolucao futura)