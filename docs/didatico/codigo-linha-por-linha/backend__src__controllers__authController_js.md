# backend\src\controllers\authController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const bcrypt = require('bcryptjs');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | `const jwt = require('jsonwebtoken');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 3 | `const usuarioModel = require('../models/usuarioModel');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 4 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 5 | `async function login(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 6 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 7 | `    const { email, senha } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 8 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 9 | `    if (!email \|\| !senha) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 10 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 11 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `        mensagem: 'Email e senha sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 15 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 16 | `    const usuario = await usuarioModel.buscarPorEmail(email);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 17 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 18 | `    if (!usuario) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 19 | `      return response.status(401).json({` | Retorna um valor para quem chamou a função. |
| 20 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 21 | `        mensagem: 'Email ou senha invalidos'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 22 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 24 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 25 | `    if (Number(usuario.ativo) !== 1) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 26 | `      return response.status(403).json({` | Retorna um valor para quem chamou a função. |
| 27 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `        mensagem: 'Usuario inativo. Procure um administrador'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 31 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 32 | `    const senhaConfere = await bcrypt.compare(senha, usuario.senha_hash);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 33 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 34 | `    if (!senhaConfere) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 35 | `      return response.status(401).json({` | Retorna um valor para quem chamou a função. |
| 36 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `        mensagem: 'Email ou senha invalidos'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 40 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 41 | `    const token = jwt.sign(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 42 | `      {` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 43 | `        sub: usuario.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 44 | `        nome: usuario.nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 45 | `        email: usuario.email,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `        perfil: usuario.perfil` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `      },` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 48 | `      process.env.JWT_SECRET,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 49 | `      { expiresIn: process.env.JWT_EXPIRES_IN \|\| '1d' }` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `    );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 51 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 52 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 53 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `      mensagem: 'Login realizado com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `      token,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `      usuario: {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `        id: usuario.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `        nome: usuario.nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `        email: usuario.email,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `        perfil: usuario.perfil` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 61 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 62 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 63 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 64 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 65 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 66 | `      mensagem: 'Erro ao fazer login',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 67 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 68 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 69 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 70 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 71 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 72 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 73 | `  login` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
