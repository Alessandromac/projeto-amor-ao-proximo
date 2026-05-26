const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/usuarios', autenticar, permitirPerfis('admin', 'viewer'), usuarioController.listar);
router.post('/usuarios', autenticar, permitirPerfis('admin'), usuarioController.criar);
router.put('/usuarios/:id', autenticar, permitirPerfis('admin'), usuarioController.atualizar);
router.delete('/usuarios/:id', autenticar, permitirPerfis('admin'), usuarioController.remover);

module.exports = router;
