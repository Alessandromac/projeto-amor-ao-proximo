const express = require('express');
const estoqueController = require('../controllers/estoqueController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/estoque/movimentacoes', autenticar, permitirPerfis('admin', 'viewer'), estoqueController.listarMovimentacoes);
router.post('/estoque/movimentar', autenticar, permitirPerfis('admin'), estoqueController.movimentar);

module.exports = router;
