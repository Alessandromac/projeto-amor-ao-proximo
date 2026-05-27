const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const usuarioRoutes = require('./routes/usuarioRoutes')
const authRoutes = require('./routes/authRoutes')
const caixaRoutes = require('./routes/caixaRoutes')
const gastoRoutes = require('./routes/gastoRoutes')
const app = express()
const produtoRoutes = require('./routes/produtoRoutes')
//const estoqueRoutes = require('./routes/estoqueRoutes')
const passkeyRoutes = require('./routes/passkeyRoutes')
const doacaoRoutes = require('./routes/doacaoRoutes')
const contaCaixaRoutes = require('./routes/contaCaixaRoutes')

app.use(cors())
app.use(express.json())
app.use('/api', caixaRoutes)
app.use('/api', gastoRoutes)
app.use('/api', produtoRoutes)
//app.use('/api', estoqueRoutes)
app.use('/api', passkeyRoutes)
app.use('/api', doacaoRoutes)
app.use('/api', contaCaixaRoutes)

app.get('/health', (request, response) => {
  return response.status(200).json({
    ok: true,
    mensagem: 'API online com sucesso'
  })
})

app.get('/health/db', async (request, response) => {
  try {
    const [rows] = await db.query('SELECT 1 AS banco_online')

    return response.status(200).json({
      ok: true,
      mensagem: 'Banco conectado com sucesso',
      resultado: rows[0]
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao conectar no banco',
      erro: error.message
    })
  }
})

app.use('/api', authRoutes)
app.use('/api', usuarioRoutes)

module.exports = app
