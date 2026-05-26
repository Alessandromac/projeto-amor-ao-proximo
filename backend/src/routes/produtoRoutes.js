const express = require('express');
const produtoController = require('../controllers/produtoController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/produtos', autenticar, permitirPerfis('admin', 'viewer'), produtoController.listar);
router.post('/produtos', autenticar, permitirPerfis('admin'), produtoController.criar);
router.put('/produtos/:id', autenticar, permitirPerfis('admin'), produtoController.atualizar);
router.delete('/produtos/:id', autenticar, permitirPerfis('admin'), produtoController.remover);

module.exports = router;
