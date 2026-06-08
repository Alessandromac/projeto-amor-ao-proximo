# backend\src\routes\usuarioRoutes.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const express = require('express');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | `const usuarioController = require('../controllers/usuarioController');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 3 | `const { autenticar } = require('../middlewares/authMiddleware');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 4 | `const { permitirPerfis } = require('../middlewares/perfilMiddleware');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 6 | `const router = express.Router();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 7 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 8 | `router.get('/usuarios', autenticar, permitirPerfis('admin', 'viewer'), usuarioController.listar);` | Cria uma rota GET da API, usada para consultar/listar dados. |
| 9 | `router.post('/usuarios', autenticar, permitirPerfis('admin'), usuarioController.criar);` | Cria uma rota POST da API, usada para cadastrar/enviar dados. |
| 10 | `router.put('/usuarios/:id', autenticar, permitirPerfis('admin'), usuarioController.atualizar);` | Cria uma rota PUT da API, usada para atualizar dados. |
| 11 | `router.delete('/usuarios/:id', autenticar, permitirPerfis('admin'), usuarioController.remover);` | Cria uma rota DELETE da API, usada para excluir dados. |
| 12 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 13 | `module.exports = router;` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 14 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
