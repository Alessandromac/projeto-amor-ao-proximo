# backend\src\models\passkeyModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db')` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar({` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 5 | `  credentialId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 6 | `  publicKey,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  counter,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  deviceType,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 9 | `  backedUp,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `  transports` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `}) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `  const sql = \`` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 13 | `    INSERT INTO usuarios_passkeys` | SQL de inserção: cria um novo registro no banco. |
| 14 | `    (usuario_id, credential_id, public_key, counter, device_type, backed_up, transports)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `    VALUES (?, ?, ?, ?, ?, ?, ?)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `  \`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 17 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 18 | `  await db.query(sql, [` | Espera uma operação assíncrona terminar antes de continuar. |
| 19 | `    usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `    credentialId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 21 | `    publicKey,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 22 | `    counter,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | `    deviceType \|\| null,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 24 | `    backedUp ? 1 : 0,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `    transports ? JSON.stringify(transports) : null` | Transforma um objeto JavaScript em texto JSON. |
| 26 | `  ])` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 28 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 29 | `async function buscarPorUsuarioId(usuarioId) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 30 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 31 | `    \`SELECT * FROM usuarios_passkeys WHERE usuario_id = ?\`,` | SQL de consulta: busca dados no banco. |
| 32 | `    [usuarioId]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `  return rows` | Retorna um valor para quem chamou a função. |
| 35 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 36 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 37 | `async function buscarPorCredentialId(credentialId) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 38 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 39 | `    \`SELECT * FROM usuarios_passkeys WHERE credential_id = ? LIMIT 1\`,` | SQL de consulta: busca dados no banco. |
| 40 | `    [credentialId]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `  )` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  return rows[0] \|\| null` | Retorna um valor para quem chamou a função. |
| 43 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 44 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 45 | `async function atualizarCounter(id, counter) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 46 | `  await db.query(\`UPDATE usuarios_passkeys SET counter = ? WHERE id = ?\`, [` | Espera uma operação assíncrona terminar antes de continuar. |
| 47 | `    counter,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `    id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 49 | `  ])` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 51 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 52 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 53 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `  buscarPorUsuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `  buscarPorCredentialId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `  atualizarCounter` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 58 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
