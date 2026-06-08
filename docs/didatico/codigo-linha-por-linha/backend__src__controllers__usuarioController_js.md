# backend\src\controllers\usuarioController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const bcrypt = require('bcryptjs');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | `const usuarioModel = require('../models/usuarioModel');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 3 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 4 | `async function criar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 5 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 6 | `    const { nome, email, senha, perfil } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 7 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 8 | `    if (!nome \|\| !email \|\| !senha) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 9 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 10 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `        mensagem: 'Nome, email e senha sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 14 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 15 | `    const senhaHash = await bcrypt.hash(senha, 10);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 16 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 17 | `    const usuarioCriado = await usuarioModel.criar({` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 18 | `      nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `      email,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `      senhaHash,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 21 | `      perfil: perfil \|\| 'viewer'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 22 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 24 | `    return response.status(201).json({` | Retorna um valor para quem chamou a função. |
| 25 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      mensagem: 'Usuario criado com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      dados: usuarioCriado` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `    if (error.code === 'ER_DUP_ENTRY') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 31 | `      return response.status(409).json({` | Retorna um valor para quem chamou a função. |
| 32 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `        mensagem: 'Ja existe usuario com este email'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 36 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 37 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 38 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `      mensagem: 'Erro ao criar usuario',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 43 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 44 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 45 | `async function listar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 46 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 47 | `    const usuarios = await usuarioModel.listar();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 48 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 49 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 50 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 51 | `      dados: usuarios` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 52 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 53 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 55 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `      mensagem: 'Erro ao listar usuarios',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 60 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 61 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 62 | `async function atualizar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 63 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 64 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 65 | `    const { nome, email, perfil, ativo } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 66 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 67 | `    if (!id \|\| !nome \|\| !email \|\| !perfil \|\| typeof ativo === 'undefined') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 68 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 69 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 70 | `        mensagem: 'id, nome, email, perfil e ativo sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 71 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 73 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 74 | `    const usuarioExistente = await usuarioModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 75 | `    if (!usuarioExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 76 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 77 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 78 | `        mensagem: 'Usuario nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 79 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 80 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 81 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 82 | `    await usuarioModel.atualizar(id, { nome, email, perfil, ativo });` | Espera uma operação assíncrona terminar antes de continuar. |
| 83 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 84 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 85 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 86 | `      mensagem: 'Usuario atualizado com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 87 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 88 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 89 | `    if (error.code === 'ER_DUP_ENTRY') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 90 | `      return response.status(409).json({` | Retorna um valor para quem chamou a função. |
| 91 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 92 | `        mensagem: 'Ja existe usuario com este email'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 93 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 94 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 95 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 96 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 97 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 98 | `      mensagem: 'Erro ao atualizar usuario',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 99 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 101 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 102 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 103 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 104 | `async function remover(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 105 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 106 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 107 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 108 | `    if (!id) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 109 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 110 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 111 | `        mensagem: 'id invalido'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 112 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 113 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 114 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 115 | `    const usuarioExistente = await usuarioModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 116 | `    if (!usuarioExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 117 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 118 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 119 | `        mensagem: 'Usuario nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 120 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 121 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 122 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 123 | `    if (usuarioExistente.perfil === 'admin' && Number(usuarioExistente.ativo) === 1) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 124 | `      const totalAdminsAtivos = await usuarioModel.contarAdminsAtivos();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 125 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 126 | `      if (totalAdminsAtivos <= 1) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 127 | `        return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 128 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 129 | `          mensagem: 'Nao e permitido excluir o ultimo admin ativo'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 130 | `        });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 131 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 132 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 133 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 134 | `    await usuarioModel.remover(id);` | Espera uma operação assíncrona terminar antes de continuar. |
| 135 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 136 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 137 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 138 | `      mensagem: 'Usuario removido com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 139 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 140 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 141 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 142 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 143 | `      mensagem: 'Erro ao remover usuario',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 144 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 145 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 146 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 147 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 148 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 149 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 150 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 151 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 152 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 153 | `  remover` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 154 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 155 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
