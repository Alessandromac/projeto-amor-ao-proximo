# backend\src\middlewares\authMiddleware.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const jwt = require('jsonwebtoken');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `function autenticar(request, response, next) {` | Declara uma função, que agrupa uma rotina reutilizável do sistema. |
| 4 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 5 | `    const authHeader = request.headers.authorization;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 6 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 7 | `    if (!authHeader) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 8 | `      return response.status(401).json({` | Retorna um valor para quem chamou a função. |
| 9 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `        mensagem: 'Token nao enviado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `    const partes = authHeader.split(' ');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 15 | `    if (partes.length !== 2 \|\| partes[0] !== 'Bearer') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 16 | `      return response.status(401).json({` | Retorna um valor para quem chamou a função. |
| 17 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `        mensagem: 'Formato do token invalido. Use: Bearer SEU_TOKEN'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 21 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 22 | `    const token = partes[1];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 23 | `    const payload = jwt.verify(token, process.env.JWT_SECRET);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 24 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 25 | `    request.usuario = {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      id: payload.sub,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      nome: payload.nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `      email: payload.email,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `      perfil: payload.perfil` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `    };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 32 | `    return next();` | Retorna um valor para quem chamou a função. |
| 33 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `    return response.status(401).json({` | Retorna um valor para quem chamou a função. |
| 35 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `      mensagem: 'Token invalido ou expirado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 39 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 40 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 41 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 42 | `  autenticar` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 43 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 44 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
