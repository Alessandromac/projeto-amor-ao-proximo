const express = require('express');
const gastoController = require('../controllers/gastoController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/gastos', autenticar, permitirPerfis('admin', 'viewer'), gastoController.listar);
router.post('/gastos', autenticar, permitirPerfis('admin'), gastoController.criar);
router.put('/gastos/:id', autenticar, permitirPerfis('admin'), gastoController.atualizar);
router.delete('/gastos/:id', autenticar, permitirPerfis('admin'), gastoController.remover);

module.exports = router;
