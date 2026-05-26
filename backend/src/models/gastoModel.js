const db = require('../config/db');

async function criar({ descricao, categoria, valor, dataGasto, observacao, usuarioId }) {
  const sql = `
    INSERT INTO gastos (descricao, categoria, valor, data_gasto, observacao, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [descricao, categoria, valor, dataGasto, observacao || null, usuarioId];

  const [resultado] = await db.query(sql, valores);
  return {
    id: resultado.insertId,
    descricao,
    categoria,
    valor,
    data_gasto: dataGasto,
    observacao: observacao || null,
    usuario_id: usuarioId
  };
}

async function listar() {
  const sql = `
    SELECT
      g.id,
      g.descricao,
      g.categoria,
      g.valor,
      g.data_gasto,
      g.observacao,
      g.usuario_id,
      u.nome AS usuario_nome,
      g.created_at,
      g.updated_at
    FROM gastos g
    INNER JOIN usuarios u ON u.id = g.usuario_id
    ORDER BY g.data_gasto DESC, g.id DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, descricao, categoria, valor, data_gasto, observacao, usuario_id
    FROM gastos
    WHERE id = ?
    LIMIT 1
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0] || null;
}

async function atualizar(id, { descricao, categoria, valor, dataGasto, observacao }) {
  const sql = `
    UPDATE gastos
    SET descricao = ?, categoria = ?, valor = ?, data_gasto = ?, observacao = ?
    WHERE id = ?
  `;
  const valores = [descricao, categoria, valor, dataGasto, observacao || null, id];
  const [resultado] = await db.query(sql, valores);
  return resultado.affectedRows;
}

async function remover(id) {
  const sql = `DELETE FROM gastos WHERE id = ?`;
  const [resultado] = await db.query(sql, [id]);
  return resultado.affectedRows;
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  remover
};
