const db = require('../config/db')

async function criar({ nome, ativo = 1 }) {
  const [resultado] = await db.query(
    `
      INSERT INTO contas_caixa (nome, ativo)
      VALUES (?, ?)
    `,
    [nome, ativo ? 1 : 0]
  )

  return {
    id: resultado.insertId,
    nome,
    ativo: ativo ? 1 : 0
  }
}

async function listar({ incluirInativas = false } = {}) {
  const where = incluirInativas ? '' : 'WHERE ativo = 1'
  const [rows] = await db.query(
    `
      SELECT id, nome, ativo, created_at, updated_at
      FROM contas_caixa
      ${where}
      ORDER BY nome ASC
    `
  )
  return rows
}

async function buscarPorId(id) {
  const [rows] = await db.query(
    `
      SELECT id, nome, ativo
      FROM contas_caixa
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  )
  return rows[0] || null
}

async function buscarPorNome(nome) {
  const [rows] = await db.query(
    `
      SELECT id, nome, ativo
      FROM contas_caixa
      WHERE nome = ?
      LIMIT 1
    `,
    [nome]
  )
  return rows[0] || null
}

async function atualizar(id, { nome, ativo }) {
  const [resultado] = await db.query(
    `
      UPDATE contas_caixa
      SET nome = ?, ativo = ?
      WHERE id = ?
    `,
    [nome, ativo ? 1 : 0, id]
  )
  return resultado.affectedRows
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  buscarPorNome,
  atualizar
}

