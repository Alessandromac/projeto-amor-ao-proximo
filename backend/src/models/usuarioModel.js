const db = require('../config/db');

async function criar({ nome, email, senhaHash, perfil = 'viewer' }) {
  const sql = `
    INSERT INTO usuarios (nome, email, senha_hash, perfil)
    VALUES (?, ?, ?, ?)
  `;
  const valores = [nome, email, senhaHash, perfil];

  const [resultado] = await db.query(sql, valores);
  return { id: resultado.insertId, nome, email, perfil };
}

async function listar() {
  const sql = `
    SELECT id, nome, email, perfil, ativo, created_at, updated_at
    FROM usuarios
    ORDER BY id DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
}

async function buscarPorId(id) {
  const sql = `
    SELECT id, nome, email, perfil, ativo, created_at, updated_at
    FROM usuarios
    WHERE id = ?
    LIMIT 1
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0] || null;
}

async function buscarPorEmail(email) {
  const sql = `
    SELECT id, nome, email, senha_hash, perfil, ativo
    FROM usuarios
    WHERE email = ?
    LIMIT 1
  `;
  const [rows] = await db.query(sql, [email]);
  return rows[0] || null;
}

async function atualizar(id, { nome, email, perfil, ativo }) {
  const sql = `
    UPDATE usuarios
    SET nome = ?, email = ?, perfil = ?, ativo = ?
    WHERE id = ?
  `;
  const valores = [nome, email, perfil, ativo, id];
  const [resultado] = await db.query(sql, valores);
  return resultado.affectedRows;
}

async function remover(id) {
  const sql = `DELETE FROM usuarios WHERE id = ?`;
  const [resultado] = await db.query(sql, [id]);
  return resultado.affectedRows;
}

async function contarAdminsAtivos() {
  const sql = `
    SELECT COUNT(*) AS total
    FROM usuarios
    WHERE perfil = 'admin' AND ativo = 1
  `;
  const [rows] = await db.query(sql);
  return rows[0].total;
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  buscarPorEmail,
  atualizar,
  remover,
  contarAdminsAtivos
};
