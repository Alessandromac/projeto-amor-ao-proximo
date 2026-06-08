# backend\src\models\contaCaixaModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db')` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({ nome, ativo = 1 }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  const [resultado] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 6 | `      INSERT INTO contas_caixa (nome, ativo)` | SQL de inserção: cria um novo registro no banco. |
| 7 | `      VALUES (?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `    \`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 9 | `    [nome, ativo ? 1 : 0]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 12 | `  return {` | Retorna um valor para quem chamou a função. |
| 13 | `    id: resultado.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `    nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `    ativo: ativo ? 1 : 0` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 17 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 18 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 19 | `async function listar({ incluirInativas = false } = {}) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 20 | `  const where = incluirInativas ? '' : 'WHERE ativo = 1'` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 21 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 22 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | `      SELECT id, nome, ativo, created_at, updated_at` | SQL de consulta: busca dados no banco. |
| 24 | `      FROM contas_caixa` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `      ${where}` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      ORDER BY nome ASC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `  return rows` | Retorna um valor para quem chamou a função. |
| 30 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 31 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 32 | `async function buscarPorId(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 33 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 34 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `      SELECT id, nome, ativo` | SQL de consulta: busca dados no banco. |
| 36 | `      FROM contas_caixa` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `      WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `      LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `    \`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `    [id]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  return rows[0] \|\| null` | Retorna um valor para quem chamou a função. |
| 43 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 44 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 45 | `async function buscarPorNome(nome) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 46 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 47 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `      SELECT id, nome, ativo` | SQL de consulta: busca dados no banco. |
| 49 | `      FROM contas_caixa` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `      WHERE nome = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 51 | `      LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 52 | `    \`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 53 | `    [nome]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `  return rows[0] \|\| null` | Retorna um valor para quem chamou a função. |
| 56 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 57 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 58 | `async function atualizar(id, { nome, ativo }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 59 | `  const [resultado] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 60 | `    \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 61 | `      UPDATE contas_caixa` | SQL de atualização: altera dados já existentes no banco. |
| 62 | `      SET nome = ?, ativo = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 63 | `      WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 64 | `    \`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 65 | `    [nome, ativo ? 1 : 0, id]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 66 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 67 | `  return resultado.affectedRows` | Retorna um valor para quem chamou a função. |
| 68 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 69 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 70 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 71 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `  buscarPorId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | `  buscarPorNome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `  atualizar` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 77 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 78 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
