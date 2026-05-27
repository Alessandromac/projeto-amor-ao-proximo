const db = require('../config/db')

async function criar({
  tipo,
  descricao,
  categoria,
  valor,
  dataMovimento,
  usuarioId,
  contaCaixaId
}) {
  const sql = `
    INSERT INTO movimentacoes_caixa (tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  const valores = [
    tipo,
    descricao,
    categoria,
    valor,
    dataMovimento,
    usuarioId,
    contaCaixaId
  ]

  const [resultado] = await db.query(sql, valores)
  return {
    id: resultado.insertId,
    tipo,
    descricao,
    categoria,
    valor,
    dataMovimento,
    usuarioId,
    contaCaixaId
  }
}

async function listar({ contaId, busca }) {
  const where = []
  const valores = []

  if (contaId) {
    where.push('mc.conta_caixa_id = ?')
    valores.push(contaId)
  }

  if (busca) {
    where.push('(mc.descricao LIKE ? OR mc.categoria LIKE ? OR u.nome LIKE ? OR cc.nome LIKE ?)')
    const termo = `%${busca}%`
    valores.push(termo, termo, termo, termo)
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

  const sql = `
    SELECT
      mc.id,
      mc.tipo,
      mc.descricao,
      mc.categoria,
      mc.valor,
      mc.data_movimento,
      mc.usuario_id,
      mc.conta_caixa_id,
      COALESCE(cc.nome, 'Sem conta') AS conta_nome,
      u.nome AS usuario_nome,
      mc.created_at,
      mc.updated_at
    FROM movimentacoes_caixa mc
    INNER JOIN usuarios u ON u.id = mc.usuario_id
    LEFT JOIN contas_caixa cc ON cc.id = mc.conta_caixa_id
    ${whereSql}
    ORDER BY mc.data_movimento DESC, mc.id DESC
  `
  const [rows] = await db.query(sql, valores)
  return rows
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id
    FROM movimentacoes_caixa
    WHERE id = ?
    LIMIT 1
  `
  const [rows] = await db.query(sql, [id])
  return rows[0] || null
}

async function atualizar(
  id,
  { tipo, descricao, categoria, valor, dataMovimento, contaCaixaId }
) {
  const sql = `
    UPDATE movimentacoes_caixa
    SET tipo = ?, descricao = ?, categoria = ?, valor = ?, data_movimento = ?, conta_caixa_id = ?
    WHERE id = ?
  `
  const valores = [
    tipo,
    descricao,
    categoria,
    valor,
    dataMovimento,
    contaCaixaId,
    id
  ]
  const [resultado] = await db.query(sql, valores)
  return resultado.affectedRows
}

async function remover(id) {
  const sql = `DELETE FROM movimentacoes_caixa WHERE id = ?`
  const [resultado] = await db.query(sql, [id])
  return resultado.affectedRows
}

async function obterSaldo({ contaId } = {}) {
  const whereSql = contaId ? 'WHERE conta_caixa_id = ?' : ''
  const valores = contaId ? [contaId] : []

  const sql = `
    SELECT
      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END), 0) AS total_entradas,
      COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END), 0) AS total_saidas,
      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE -valor END), 0) AS saldo_atual
    FROM movimentacoes_caixa
    ${whereSql}
  `
  const [rows] = await db.query(sql, valores)
  return rows[0]
}

async function obterSaldoPorConta() {
  const [rows] = await db.query(`
    SELECT
      cc.id AS conta_caixa_id,
      cc.nome AS conta_nome,
      COALESCE(SUM(CASE WHEN mc.tipo = 'entrada' THEN mc.valor ELSE 0 END), 0) AS total_entradas,
      COALESCE(SUM(CASE WHEN mc.tipo = 'saida' THEN mc.valor ELSE 0 END), 0) AS total_saidas,
      COALESCE(SUM(CASE WHEN mc.tipo = 'entrada' THEN mc.valor ELSE -mc.valor END), 0) AS saldo_atual
    FROM contas_caixa cc
    LEFT JOIN movimentacoes_caixa mc ON mc.conta_caixa_id = cc.id
    GROUP BY cc.id, cc.nome
    ORDER BY cc.nome ASC
  `)

  return rows
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  remover,
  obterSaldo,
  obterSaldoPorConta
}
