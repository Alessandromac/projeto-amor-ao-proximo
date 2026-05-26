const express = require('express');
const doacaoController = require('../controllers/doacaoController');
const { autenticar } = require('../middlewares/authMiddleware');
const { permitirPerfis } = require('../middlewares/perfilMiddleware');

const router = express.Router();

router.get('/doacoes', autenticar, permitirPerfis('admin', 'viewer'), doacaoController.listar);
router.post('/doacoes', autenticar, permitirPerfis('admin'), doacaoController.criar);

module.exports = router;