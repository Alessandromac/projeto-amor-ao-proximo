# backend\src\models\usuarioModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({ nome, email, senhaHash, perfil = 'viewer' }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | `    INSERT INTO usuarios (nome, email, senha_hash, perfil)` | SQL de inserção: cria um novo registro no banco. |
| 6 | `    VALUES (?, ?, ?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  const valores = [nome, email, senhaHash, perfil];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 9 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 10 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 11 | `  return { id: resultado.insertId, nome, email, perfil };` | Retorna um valor para quem chamou a função. |
| 12 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `async function listar() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 15 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 16 | `    SELECT id, nome, email, perfil, ativo, created_at, updated_at` | SQL de consulta: busca dados no banco. |
| 17 | `    FROM usuarios` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `    ORDER BY id DESC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `  const [rows] = await db.query(sql);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 21 | `  return rows;` | Retorna um valor para quem chamou a função. |
| 22 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 23 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 24 | `async function buscarPorId(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 25 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 26 | `    SELECT id, nome, email, perfil, ativo, created_at, updated_at` | SQL de consulta: busca dados no banco. |
| 27 | `    FROM usuarios` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `    LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | `  const [rows] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 32 | `  return rows[0] \|\| null;` | Retorna um valor para quem chamou a função. |
| 33 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 34 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 35 | `async function buscarPorEmail(email) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 36 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 37 | `    SELECT id, nome, email, senha_hash, perfil, ativo` | SQL de consulta: busca dados no banco. |
| 38 | `    FROM usuarios` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `    WHERE email = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `    LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  const [rows] = await db.query(sql, [email]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 43 | `  return rows[0] \|\| null;` | Retorna um valor para quem chamou a função. |
| 44 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 45 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 46 | `async function atualizar(id, { nome, email, perfil, ativo }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 47 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 48 | `    UPDATE usuarios` | SQL de atualização: altera dados já existentes no banco. |
| 49 | `    SET nome = ?, email = ?, perfil = ?, ativo = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 51 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 52 | `  const valores = [nome, email, perfil, ativo, id];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 53 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 54 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 55 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 56 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 57 | `async function remover(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 58 | `  const sql = \`DELETE FROM usuarios WHERE id = ?\`;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 59 | `  const [resultado] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 60 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 61 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 62 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 63 | `async function contarAdminsAtivos() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 64 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 65 | `    SELECT COUNT(*) AS total` | SQL de consulta: busca dados no banco. |
| 66 | `    FROM usuarios` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 67 | `    WHERE perfil = 'admin' AND ativo = 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 68 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 69 | `  const [rows] = await db.query(sql);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 70 | `  return rows[0].total;` | Retorna um valor para quem chamou a função. |
| 71 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 72 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 73 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 74 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `  buscarPorId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 77 | `  buscarPorEmail,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 78 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 79 | `  remover,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 80 | `  contarAdminsAtivos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 81 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 82 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
