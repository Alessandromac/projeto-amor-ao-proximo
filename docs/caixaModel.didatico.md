// Importa pool de conexão MySQL.
const db = require('../../config/db')

// Model: cria movimentação no banco.
async function criar({
  tipo,
  descricao,
  categoria,
  valor,
  dataMovimento,
  usuarioId
}) {
  // SQL de inserção.
  const sql = `
    INSERT INTO movimentacoes_caixa (tipo, descricao, categoria, valor, data_movimento, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  // Valores posicionais dos "?".
  const valores = [tipo, descricao, categoria, valor, dataMovimento, usuarioId]

  // Executa query.
  const [resultado] = await db.query(sql, valores)

  // Retorna objeto amigável com dados criados.
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

// Model: lista movimentações com nome do usuário.
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

// Model: busca movimentação por ID.
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

// Model: atualiza movimentação por ID.
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

  // affectedRows indica quantas linhas foram alteradas.
  return resultado.affectedRows
}

// Model: remove movimentação por ID.
async function remover(id) {
  const sql = `DELETE FROM movimentacoes_caixa WHERE id = ?`
  const [resultado] = await db.query(sql, [id])
  return resultado.affectedRows
}

// Model: calcula resumo financeiro geral do caixa.
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

// Exporta operações para controller.
module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  remover,
  obterSaldo
}
