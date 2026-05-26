# 01 - Visao Geral

## Objetivo
Criar um sistema web responsivo para controle de:
- caixa (entradas e saidas de dinheiro)
- gastos
- produtos e estoque
- usuarios com permissao por perfil

## Perfis de usuario
- `admin`: pode cadastrar, editar e excluir
- `viewer`: pode apenas consultar/listar

## Arquitetura simples
- `frontend` (React): telas e interacao com usuario
- `backend` (Node.js + Express): API e regras de negocio
- `banco` (MySQL): armazenamento dos dados

## Fluxo da aplicacao
1. O frontend envia uma requisicao para a API.
2. A API valida os dados e o usuario.
3. A API consulta/grava dados no MySQL.
4. O MySQL responde para a API.
5. A API devolve resposta JSON ao frontend.
6. O frontend atualiza a tela.

## Glossario rapido
- `frontend`: parte visual do sistema
- `backend`: parte que processa as regras
- `API`: ponte entre tela e banco
- `endpoint/route`: endereco da API (ex.: `/api/usuarios`)
- `request`: pedido enviado para a API
- `response`: resposta devolvida pela API
- `CRUD`: criar, listar, editar e excluir
