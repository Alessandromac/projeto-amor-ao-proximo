# 02 - Banco de Dados

## Banco escolhido
- MySQL
- Nome do banco: `controle_caixa`

## Tabelas iniciais planejadas

### 1) usuarios
- id (PK)
- nome
- email (unico)
- senha_hash
- perfil (`admin` ou `viewer`)
- ativo
- created_at
- updated_at

### 2) movimentacoes_caixa
- id (PK)
- tipo (`entrada` ou `saida`)
- descricao
- valor
- data_movimento
- usuario_id (FK -> usuarios.id)
- created_at
- updated_at

### 3) gastos
- id (PK)
- descricao
- categoria
- valor
- data_gasto
- observacao
- usuario_id (FK -> usuarios.id)
- created_at
- updated_at

### 4) produtos
- id (PK)
- nome
- sku (unico)
- unidade
- estoque_atual
- estoque_minimo
- created_at
- updated_at

### 5) movimentacoes_estoque
- id (PK)
- produto_id (FK -> produtos.id)
- tipo (`entrada` ou `saida`)
- quantidade
- motivo
- data_movimento
- usuario_id (FK -> usuarios.id)
- created_at
- updated_at

## Script SQL do projeto
- Arquivo: `backend/database/schema.sql`
- Esse arquivo contem:
1. `CREATE DATABASE IF NOT EXISTS controle_caixa`
2. `USE controle_caixa`
3. `CREATE TABLE` de usuarios, caixa, gastos, produtos e movimentacoes de estoque

## Como executar no MySQL
1. Abrir o MySQL Workbench (ou outro cliente)
2. Abrir o arquivo `backend/database/schema.sql`
3. Executar todo o script

Opcional por terminal:
```bash
mysql -u root -p < backend/database/schema.sql
```

## Resultado esperado
- Banco `controle_caixa` criado
- 5 tabelas criadas sem erro

## Erros comuns
- `Access denied for user`: usuario/senha incorretos
- `Unknown database`: faltou executar o `CREATE DATABASE` ou `USE controle_caixa`
- `Table already exists`: esperado se rodar de novo com `IF NOT EXISTS`
