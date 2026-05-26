const db = require('../config/db')

async function criar({
  usuarioId,
  credentialId,
  publicKey,
  counter,
  deviceType,
  backedUp,
  transports
}) {
  const sql = `
    INSERT INTO usuarios_passkeys
    (usuario_id, credential_id, public_key, counter, device_type, backed_up, transports)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  await db.query(sql, [
    usuarioId,
    credentialId,
    publicKey,
    counter,
    deviceType || null,
    backedUp ? 1 : 0,
    transports ? JSON.stringify(transports) : null
  ])
}

async function buscarPorUsuarioId(usuarioId) {
  const [rows] = await db.query(
    `SELECT * FROM usuarios_passkeys WHERE usuario_id = ?`,
    [usuarioId]
  )
  return rows
}

async function buscarPorCredentialId(credentialId) {
  const [rows] = await db.query(
    `SELECT * FROM usuarios_passkeys WHERE credential_id = ? LIMIT 1`,
    [credentialId]
  )
  return rows[0] || null
}

async function atualizarCounter(id, counter) {
  await db.query(`UPDATE usuarios_passkeys SET counter = ? WHERE id = ?`, [
    counter,
    id
  ])
}

module.exports = {
  criar,
  buscarPorUsuarioId,
  buscarPorCredentialId,
  atualizarCounter
}
