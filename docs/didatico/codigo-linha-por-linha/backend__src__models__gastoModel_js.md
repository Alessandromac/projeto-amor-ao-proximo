# backend\src\models\gastoModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({ descricao, categoria, valor, dataGasto, observacao, usuarioId }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | `    INSERT INTO gastos (descricao, categoria, valor, data_gasto, observacao, usuario_id)` | SQL de inserção: cria um novo registro no banco. |
| 6 | `    VALUES (?, ?, ?, ?, ?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  const valores = [descricao, categoria, valor, dataGasto, observacao \|\| null, usuarioId];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 9 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 10 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 11 | `  return {` | Retorna um valor para quem chamou a função. |
| 12 | `    id: resultado.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `    descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `    categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `    valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `    data_gasto: dataGasto,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 17 | `    observacao: observacao \|\| null,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `    usuario_id: usuarioId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `  };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 21 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 22 | `async function listar() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 23 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 24 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 25 | `      g.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      g.descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      g.categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `      g.valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `      g.data_gasto,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `      g.observacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | `      g.usuario_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 32 | `      u.nome AS usuario_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `      g.created_at,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `      g.updated_at` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `    FROM gastos g` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `    INNER JOIN usuarios u ON u.id = g.usuario_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `    ORDER BY g.data_gasto DESC, g.id DESC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `  const [rows] = await db.query(sql);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 40 | `  return rows;` | Retorna um valor para quem chamou a função. |
| 41 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 42 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 43 | `async function buscarPorId(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 44 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 45 | `    SELECT id, descricao, categoria, valor, data_gasto, observacao, usuario_id` | SQL de consulta: busca dados no banco. |
| 46 | `    FROM gastos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `    LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 49 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `  const [rows] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 51 | `  return rows[0] \|\| null;` | Retorna um valor para quem chamou a função. |
| 52 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 53 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 54 | `async function atualizar(id, { descricao, categoria, valor, dataGasto, observacao }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 55 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 56 | `    UPDATE gastos` | SQL de atualização: altera dados já existentes no banco. |
| 57 | `    SET descricao = ?, categoria = ?, valor = ?, data_gasto = ?, observacao = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `  const valores = [descricao, categoria, valor, dataGasto, observacao \|\| null, id];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 61 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 62 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 63 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 64 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 65 | `async function remover(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 66 | `  const sql = \`DELETE FROM gastos WHERE id = ?\`;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 67 | `  const [resultado] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 68 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 69 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 70 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 71 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 72 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | `  buscarPorId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `  remover` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 77 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 78 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
