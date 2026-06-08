# backend\src\models\produtoModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({ nome, sku, unidade, estoqueAtual, estoqueMinimo }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | `    INSERT INTO produtos (nome, sku, unidade, estoque_atual, estoque_minimo)` | SQL de inserção: cria um novo registro no banco. |
| 6 | `    VALUES (?, ?, ?, ?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  const valores = [nome, sku, unidade \|\| 'un', estoqueAtual \|\| 0, estoqueMinimo \|\| 0];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 9 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 10 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 11 | `  return {` | Retorna um valor para quem chamou a função. |
| 12 | `    id: resultado.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `    nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `    sku,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `    unidade: unidade \|\| 'un',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `    estoque_atual: estoqueAtual \|\| 0,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 17 | `    estoque_minimo: estoqueMinimo \|\| 0` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `  };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 20 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 21 | `async function listar() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 22 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 23 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 24 | `      id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `      nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      sku,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      unidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `      estoque_atual,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `      estoque_minimo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `      created_at,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | `      updated_at` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 32 | `    FROM produtos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `    ORDER BY id DESC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `  const [rows] = await db.query(sql);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 36 | `  return rows;` | Retorna um valor para quem chamou a função. |
| 37 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 38 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 39 | `async function buscarPorId(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 40 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 41 | `    SELECT id, nome, sku, unidade, estoque_atual, estoque_minimo` | SQL de consulta: busca dados no banco. |
| 42 | `    FROM produtos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 43 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 44 | `    LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 45 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `  const [rows] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 47 | `  return rows[0] \|\| null;` | Retorna um valor para quem chamou a função. |
| 48 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 49 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 50 | `async function atualizar(id, { nome, sku, unidade, estoqueMinimo }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 51 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 52 | `    UPDATE produtos` | SQL de atualização: altera dados já existentes no banco. |
| 53 | `    SET nome = ?, sku = ?, unidade = ?, estoque_minimo = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `  \`;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `  const valores = [nome, sku, unidade, estoqueMinimo, id];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 57 | `  const [resultado] = await db.query(sql, valores);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 58 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 59 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 60 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 61 | `async function remover(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 62 | `  const sql = \`DELETE FROM produtos WHERE id = ?\`;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 63 | `  const [resultado] = await db.query(sql, [id]);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 64 | `  return resultado.affectedRows;` | Retorna um valor para quem chamou a função. |
| 65 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 66 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 67 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 68 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 69 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 70 | `  buscarPorId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 71 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `  remover` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
