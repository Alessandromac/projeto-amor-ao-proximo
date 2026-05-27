const express = require('express')
const contaCaixaController = require('../controllers/contaCaixaController')
const { autenticar } = require('../middlewares/authMiddleware')
const { permitirPerfis } = require('../middlewares/perfilMiddleware')

const router = express.Router()

router.get(
  '/contas-caixa',
  autenticar,
  permitirPerfis('admin', 'viewer'),
  contaCaixaController.listar
)

router.post(
  '/contas-caixa',
  autenticar,
  permitirPerfis('admin'),
  contaCaixaController.criar
)

router.put(
  '/contas-caixa/:id',
  autenticar,
  permitirPerfis('admin'),
  contaCaixaController.atualizar
)

module.exports = router

