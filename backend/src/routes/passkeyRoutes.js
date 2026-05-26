const express = require('express');
const passkeyController = require('../controllers/passkeyController');

const router = express.Router();

router.post('/passkey/register/options', passkeyController.gerarCadastroOptions);
router.post('/passkey/register/verify', passkeyController.verificarCadastro);
router.post('/passkey/login/options', passkeyController.gerarLoginOptions);
router.post('/passkey/login/verify', passkeyController.verificarLogin);

module.exports = router;