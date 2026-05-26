const db = require('../config/db')

async function criar({
  tipo,
  descricao,
  categoria,
  valor,
  dataMovimento,
  usuarioId
}) {
  const sql = `
    INSERT INTO movimentacoes_caixa (tipo, descricao, categoria, valor, data_movimento, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const valores = [tipo, descricao, categoria, valor, dataMovimento, usuarioId]

  const [resultado] = await db.query(sql, valores)
  return {
    id: resultado.insertId,
    tipo,
    descricao,
    categoria,
    valor,
    dataMovimento,
    usuarioId
  }
}

async function listar() {
  const sql = `
    SELECT
      mc.id,
      mc.tipo,
      mc.descricao,
      mc.categoria,
      mc.valor,
      mc.data_movimento,
      mc.usuario_id,
      u.nome AS usuario_nome,
      mc.created_at,
      mc.updated_at
    FROM movimentacoes_caixa mc
    INNER JOIN usuarios u ON u.id = mc.usuario_id
    ORDER BY mc.data_movimento DESC, mc.id DESC
  `
  const [rows] = await db.query(sql)
  return rows
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, tipo, descricao, categoria, valor, data_movimento, usuario_id
    FROM movimentacoes_caixa
    WHERE id = ?
    LIMIT 1
  `
  const [rows] = await db.query(sql, [id])
  return rows[0] || null
}

async function atualizar(
  id,
  { tipo, descricao, categoria, valor, dataMovimento }
) {
  const sql = `
    UPDATE movimentacoes_caixa
    SET tipo = ?, descricao = ?, categoria = ?, valor = ?, data_movimento = ?
    WHERE id = ?
  `
  const valores = [tipo, descricao, categoria, valor, dataMovimento, id]
  const [resultado] = await db.query(sql, valores)
  return resultado.affectedRows
}

async function remover(id) {
  const sql = `DELETE FROM movimentacoes_caixa WHERE id = ?`
  const [resultado] = await db.query(sql, [id])
  return resultado.affectedRows
}

async function obterSaldo() {
  const sql = `
    SELECT
      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END), 0) AS total_entradas,
      COALESCE(SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END), 0) AS total_saidas,
      COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE -valor END), 0) AS saldo_atual
    FROM movimentacoes_caixa
  `
  const [rows] = await db.query(sql)
  return rows[0]
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  remover,
  obterSaldo
}
