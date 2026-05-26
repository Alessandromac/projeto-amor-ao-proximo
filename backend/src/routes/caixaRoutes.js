const express = require('express');
const caixaController = require('../controllers/caixaController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/caixa', autenticar, permitirPerfis('admin', 'viewer'), caixaController.listar);
router.get('/caixa/saldo', autenticar, permitirPerfis('admin', 'viewer'), caixaController.saldo);

router.post('/caixa', autenticar, permitirPerfis('admin'), caixaController.criar);
router.put('/caixa/:id', autenticar, permitirPerfis('admin'), caixaController.atualizar);
router.delete('/caixa/:id', autenticar, permitirPerfis('admin'), caixaController.remover);

module.exports = router;