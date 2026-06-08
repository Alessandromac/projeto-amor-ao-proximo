# backend\src\routes\estoqueRoutes.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const express = require('express');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | `const estoqueController = require('../controllers/estoqueController');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 3 | `const { autenticar } = require('../middlewares/authMiddleware');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 4 | `const { permitirPerfis } = require('../middlewares/perfilMiddleware');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 6 | `const router = express.Router();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 7 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 8 | `router.get('/estoque/movimentacoes', autenticar, permitirPerfis('admin', 'viewer'), estoqueController.listarMovimentacoes);` | Cria uma rota GET da API, usada para consultar/listar dados. |
| 9 | `router.post('/estoque/movimentar', autenticar, permitirPerfis('admin'), estoqueController.movimentar);` | Cria uma rota POST da API, usada para cadastrar/enviar dados. |
| 10 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 11 | `module.exports = router;` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 12 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
