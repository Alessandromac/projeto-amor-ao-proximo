const db = require('../config/db');

async function criar({ nome, sku, unidade, estoqueAtual, estoqueMinimo }) {
  const sql = `
    INSERT INTO produtos (nome, sku, unidade, estoque_atual, estoque_minimo)
    VALUES (?, ?, ?, ?, ?)
  `;
  const valores = [nome, sku, unidade || 'un', estoqueAtual || 0, estoqueMinimo || 0];

  const [resultado] = await db.query(sql, valores);
  return {
    id: resultado.insertId,
    nome,
    sku,
    unidade: unidade || 'un',
    estoque_atual: estoqueAtual || 0,
    estoque_minimo: estoqueMinimo || 0
  };
}

async function listar() {
  const sql = `
    SELECT
      id,
      nome,
      sku,
      unidade,
      estoque_atual,
      estoque_minimo,
      created_at,
      updated_at
    FROM produtos
    ORDER BY id DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, nome, sku, unidade, estoque_atual, estoque_minimo
    FROM produtos
    WHERE id = ?
    LIMIT 1
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0] || null;
}

async function atualizar(id, { nome, sku, unidade, estoqueMinimo }) {
  const sql = `
    UPDATE produtos
    SET nome = ?, sku = ?, unidade = ?, estoque_minimo = ?
    WHERE id = ?
  `;
  const valores = [nome, sku, unidade, estoqueMinimo, id];
  const [resultado] = await db.query(sql, valores);
  return resultado.affectedRows;
}

async function remover(id) {
  const sql = `DELETE FROM produtos WHERE id = ?`;
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
