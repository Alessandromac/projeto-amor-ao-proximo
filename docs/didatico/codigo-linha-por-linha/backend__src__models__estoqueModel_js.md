# backend\src\models\estoqueModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criarMovimentacao({ produtoId, tipo, quantidade, motivo, usuarioId }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  const conexao = await db.getConnection();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 6 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 7 | `    await conexao.beginTransaction();` | Espera uma operação assíncrona terminar antes de continuar. |
| 8 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 9 | `    const [produtos] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 10 | `      'SELECT id, estoque_atual FROM produtos WHERE id = ? LIMIT 1',` | SQL de consulta: busca dados no banco. |
| 11 | `      [produtoId]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `    );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `    if (!produtos.length) throw new Error('PRODUTO_NAO_ENCONTRADO');` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 15 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 16 | `    const estoqueAtual = Number(produtos[0].estoque_atual);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 17 | `    const qtd = Number(quantidade);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 18 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 19 | `    if (tipo === 'saida' && estoqueAtual < qtd) throw new Error('ESTOQUE_INSUFICIENTE');` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 20 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 21 | `    const novoEstoque = tipo === 'entrada' ? estoqueAtual + qtd : estoqueAtual - qtd;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 22 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 23 | `    const [mov] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 24 | `      \`INSERT INTO movimentacoes_estoque` | SQL de inserção: cria um novo registro no banco. |
| 25 | `       (produto_id, tipo, quantidade, motivo, data_movimento, usuario_id)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `       VALUES (?, ?, ?, ?, NOW(), ?)\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      [produtoId, tipo, qtd, motivo \|\| null, usuarioId]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `    );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 29 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 30 | `    await conexao.query('UPDATE produtos SET estoque_atual = ? WHERE id = ?', [novoEstoque, produtoId]);` | Espera uma operação assíncrona terminar antes de continuar. |
| 31 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 32 | `    await conexao.commit();` | Espera uma operação assíncrona terminar antes de continuar. |
| 33 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 34 | `    return {` | Retorna um valor para quem chamou a função. |
| 35 | `      id: mov.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `      produto_id: produtoId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `      tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `      quantidade: qtd,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `      motivo: motivo \|\| null,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      usuario_id: usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `      estoque_atual: novoEstoque` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `    };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 43 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 44 | `    await conexao.rollback();` | Espera uma operação assíncrona terminar antes de continuar. |
| 45 | `    throw error;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `  } finally {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `    conexao.release();` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 49 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 50 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 51 | `async function listarMovimentacoes() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 52 | `  const [rows] = await db.query(\`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 53 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 54 | `      me.id, me.produto_id, p.nome AS produto_nome, p.sku AS produto_sku,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `      me.tipo, me.quantidade, me.motivo, me.data_movimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `      me.usuario_id, u.nome AS usuario_nome` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `    FROM movimentacoes_estoque me` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `    INNER JOIN produtos p ON p.id = me.produto_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `    INNER JOIN usuarios u ON u.id = me.usuario_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `    ORDER BY me.data_movimento DESC, me.id DESC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 61 | `  \`);` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 62 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 63 | `  return rows;` | Retorna um valor para quem chamou a função. |
| 64 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 65 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 66 | `module.exports = { criarMovimentacao, listarMovimentacoes };` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 67 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
