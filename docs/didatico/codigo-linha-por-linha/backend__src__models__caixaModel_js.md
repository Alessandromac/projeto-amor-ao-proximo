# backend\src\models\caixaModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db')` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 5 | `  descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 6 | `  categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  dataMovimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 9 | `  usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `  contaCaixaId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `}) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 13 | `    INSERT INTO movimentacoes_caixa (tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id)` | SQL de inserção: cria um novo registro no banco. |
| 14 | `    VALUES (?, ?, ?, ?, ?, ?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `  const valores = [` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 17 | `    tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `    descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `    categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `    valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 21 | `    dataMovimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 22 | `    usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | `    contaCaixaId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 24 | `  ]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 26 | `  const [resultado] = await db.query(sql, valores)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 27 | `  return {` | Retorna um valor para quem chamou a função. |
| 28 | `    id: resultado.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `    tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `    descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | `    categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 32 | `    valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `    dataMovimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `    usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `    contaCaixaId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 37 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 38 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 39 | `async function listar({ contaId, busca }) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 40 | `  const where = []` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 41 | `  const valores = []` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 42 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 43 | `  if (contaId) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 44 | `    where.push('mc.conta_caixa_id = ?')` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 45 | `    valores.push(contaId)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 47 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 48 | `  if (busca) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 49 | `    where.push('(mc.descricao LIKE ? OR mc.categoria LIKE ? OR u.nome LIKE ? OR cc.nome LIKE ?)')` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `    const termo = \`%${busca}%\`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 51 | `    valores.push(termo, termo, termo, termo)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 52 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 53 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 54 | `  const whereSql = where.length ? \`WHERE ${where.join(' AND ')}\` : ''` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 55 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 56 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 57 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 58 | `      mc.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `      mc.tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `      mc.descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 61 | `      mc.categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 62 | `      mc.valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 63 | `      mc.data_movimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 64 | `      mc.usuario_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 65 | `      mc.conta_caixa_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 66 | `      COALESCE(cc.nome, 'Sem conta') AS conta_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 67 | `      u.nome AS usuario_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 68 | `      mc.created_at,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 69 | `      mc.updated_at` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 70 | `    FROM movimentacoes_caixa mc` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 71 | `    INNER JOIN usuarios u ON u.id = mc.usuario_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `    LEFT JOIN contas_caixa cc ON cc.id = mc.conta_caixa_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `    ${whereSql}` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | `    ORDER BY mc.data_movimento DESC, mc.id DESC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `  const [rows] = await db.query(sql, valores)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 77 | `  return rows` | Retorna um valor para quem chamou a função. |
| 78 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 79 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 80 | `async function buscarPorId(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 81 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 82 | `    SELECT id, tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id` | SQL de consulta: busca dados no banco. |
| 83 | `    FROM movimentacoes_caixa` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 84 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | `    LIMIT 1` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 86 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 87 | `  const [rows] = await db.query(sql, [id])` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 88 | `  return rows[0] \|\| null` | Retorna um valor para quem chamou a função. |
| 89 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 90 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 91 | `async function atualizar(` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 92 | `  id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 93 | `  { tipo, descricao, categoria, valor, dataMovimento, contaCaixaId }` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 94 | `) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 95 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 96 | `    UPDATE movimentacoes_caixa` | SQL de atualização: altera dados já existentes no banco. |
| 97 | `    SET tipo = ?, descricao = ?, categoria = ?, valor = ?, data_movimento = ?, conta_caixa_id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 98 | `    WHERE id = ?` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 99 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `  const valores = [` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 101 | `    tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 102 | `    descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 103 | `    categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 104 | `    valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 105 | `    dataMovimento,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 106 | `    contaCaixaId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 107 | `    id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 108 | `  ]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 109 | `  const [resultado] = await db.query(sql, valores)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 110 | `  return resultado.affectedRows` | Retorna um valor para quem chamou a função. |
| 111 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 112 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 113 | `async function remover(id) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 114 | `  const sql = \`DELETE FROM movimentacoes_caixa WHERE id = ?\`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 115 | `  const [resultado] = await db.query(sql, [id])` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 116 | `  return resultado.affectedRows` | Retorna um valor para quem chamou a função. |
| 117 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 118 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 119 | `async function obterSaldo({ contaId } = {}) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 120 | `  const whereSql = contaId ? 'WHERE conta_caixa_id = ?' : ''` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 121 | `  const valores = contaId ? [contaId] : []` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 122 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 123 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 124 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 125 | `      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END), 0) AS total_entradas,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 126 | `      COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END), 0) AS total_saidas,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 127 | `      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE -valor END), 0) AS saldo_atual` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 128 | `    FROM movimentacoes_caixa` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 129 | `    ${whereSql}` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 130 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 131 | `  const [rows] = await db.query(sql, valores)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 132 | `  return rows[0]` | Retorna um valor para quem chamou a função. |
| 133 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 134 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 135 | `async function obterSaldoPorConta() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 136 | `  const [rows] = await db.query(\`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 137 | `    SELECT` | SQL de consulta: busca dados no banco. |
| 138 | `      cc.id AS conta_caixa_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 139 | `      cc.nome AS conta_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 140 | `      COALESCE(SUM(CASE WHEN mc.tipo = 'entrada' THEN mc.valor ELSE 0 END), 0) AS total_entradas,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 141 | `      COALESCE(SUM(CASE WHEN mc.tipo = 'saida' THEN mc.valor ELSE 0 END), 0) AS total_saidas,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 142 | `      COALESCE(SUM(CASE WHEN mc.tipo = 'entrada' THEN mc.valor ELSE -mc.valor END), 0) AS saldo_atual` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 143 | `    FROM contas_caixa cc` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 144 | `    LEFT JOIN movimentacoes_caixa mc ON mc.conta_caixa_id = cc.id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 145 | `    GROUP BY cc.id, cc.nome` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 146 | `    ORDER BY cc.nome ASC` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 147 | `  \`)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 148 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 149 | `  return rows` | Retorna um valor para quem chamou a função. |
| 150 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 151 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 152 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 153 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 154 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 155 | `  buscarPorId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 156 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 157 | `  remover,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 158 | `  obterSaldo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 159 | `  obterSaldoPorConta` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 160 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 161 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
