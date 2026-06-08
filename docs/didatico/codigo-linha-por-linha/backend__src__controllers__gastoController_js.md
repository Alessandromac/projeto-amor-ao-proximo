# backend\src\controllers\gastoController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const gastoModel = require('../models/gastoModel');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 5 | `    const { descricao, categoria, valor, data_gasto, observacao } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 6 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 7 | `    if (!descricao \|\| !categoria \|\| typeof valor === 'undefined' \|\| !data_gasto) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 8 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 9 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `        mensagem: 'descricao, categoria, valor e data_gasto sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `    const valorNumerico = Number(valor);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 15 | `    if (Number.isNaN(valorNumerico) \|\| valorNumerico <= 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 16 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 17 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `        mensagem: 'valor deve ser um numero maior que zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 21 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 22 | `    const gasto = await gastoModel.criar({` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 23 | `      descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 24 | `      categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `      valor: valorNumerico,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      dataGasto: data_gasto,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      observacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `      usuarioId: request.usuario.id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 31 | `    return response.status(201).json({` | Retorna um valor para quem chamou a função. |
| 32 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `      mensagem: 'Gasto criado com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `      dados: gasto` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 37 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 38 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `      mensagem: 'Erro ao criar gasto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 43 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 44 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 45 | `async function listar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 46 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 47 | `    const gastos = await gastoModel.listar();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 48 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 49 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `      dados: gastos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 51 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 52 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 53 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 54 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `      mensagem: 'Erro ao listar gastos',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 59 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 60 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 61 | `async function atualizar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 62 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 63 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 64 | `    const { descricao, categoria, valor, data_gasto, observacao } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 65 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 66 | `    if (!id \|\| !descricao \|\| !categoria \|\| typeof valor === 'undefined' \|\| !data_gasto) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 67 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 68 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 69 | `        mensagem: 'id, descricao, categoria, valor e data_gasto sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 70 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 71 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 72 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 73 | `    const valorNumerico = Number(valor);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 74 | `    if (Number.isNaN(valorNumerico) \|\| valorNumerico <= 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 75 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 76 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 77 | `        mensagem: 'valor deve ser um numero maior que zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 78 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 79 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 80 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 81 | `    const gastoExistente = await gastoModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 82 | `    if (!gastoExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 83 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 84 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | `        mensagem: 'Gasto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 86 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 87 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 88 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 89 | `    await gastoModel.atualizar(id, {` | Espera uma operação assíncrona terminar antes de continuar. |
| 90 | `      descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 91 | `      categoria,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 92 | `      valor: valorNumerico,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 93 | `      dataGasto: data_gasto,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 94 | `      observacao` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 95 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 96 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 97 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 98 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 99 | `      mensagem: 'Gasto atualizado com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 101 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 102 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 103 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 104 | `      mensagem: 'Erro ao atualizar gasto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 105 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 106 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 107 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 108 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 109 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 110 | `async function remover(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 111 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 112 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 113 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 114 | `    if (!id) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 115 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 116 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 117 | `        mensagem: 'id invalido'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 118 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 119 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 120 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 121 | `    const gastoExistente = await gastoModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 122 | `    if (!gastoExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 123 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 124 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 125 | `        mensagem: 'Gasto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 126 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 127 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 128 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 129 | `    await gastoModel.remover(id);` | Espera uma operação assíncrona terminar antes de continuar. |
| 130 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 131 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 132 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 133 | `      mensagem: 'Gasto removido com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 134 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 135 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 136 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 137 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 138 | `      mensagem: 'Erro ao remover gasto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 139 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 140 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 141 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 142 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 143 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 144 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 145 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 146 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 147 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 148 | `  remover` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 149 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 150 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
