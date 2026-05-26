// Importa framework Express para criar servidor e rotas HTTP.
const express = require('express')

// Importa middleware CORS para permitir acesso do frontend (origem diferente).
const cors = require('cors')

// Importa conexão com banco (pool mysql2).
const db = require('../config/db')

// Importa arquivos de rotas por módulo.
const usuarioRoutes = require('../routes/usuarioRoutes')
const authRoutes = require('../routes/authRoutes')
const caixaRoutes = require('../routes/caixaRoutes')
const gastoRoutes = require('../routes/gastoRoutes')
const produtoRoutes = require('../routes/produtoRoutes')
const estoqueRoutes = require('../routes/estoqueRoutes')
const passkeyRoutes = require('../routes/passkeyRoutes')
const doacaoRoutes = require('../routes/doacaoRoutes')

// Cria instância principal da aplicação Express.
const app = express()

// Habilita CORS para aceitar chamadas do frontend.
app.use(cors())

// Habilita leitura de JSON no body das requisições.
app.use(express.json())

// Liga módulos de rota sob prefixo /api.
app.use('/api', caixaRoutes)
app.use('/api', gastoRoutes)
app.use('/api', produtoRoutes)
app.use('/api', estoqueRoutes)
app.use('/api', passkeyRoutes)
app.use('/api', doacaoRoutes)
app.use('/api', authRoutes)
app.use('/api', usuarioRoutes)

// Health check simples da API (sem banco).
app.get('/health', (request, response) => {
  return response.status(200).json({
    ok: true,
    mensagem: 'API online com sucesso'
  })
})

// Health check do banco (faz query de teste).
app.get('/health/db', async (request, response) => {
  try {
    // Query mínima para validar conexão.
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

// Exporta app para ser usado em server.js (que chama app.listen).
module.exports = app
