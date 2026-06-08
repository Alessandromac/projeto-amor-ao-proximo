# backend\src\controllers\produtoController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const produtoModel = require('../models/produtoModel');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function criar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 5 | `    const { nome, sku, unidade, estoque_minimo } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 6 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 7 | `    if (!nome \|\| !sku) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 8 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 9 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `        mensagem: 'nome e sku sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `    const estoqueMinimoNumerico = Number(estoque_minimo \|\| 0);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 15 | `    if (Number.isNaN(estoqueMinimoNumerico) \|\| estoqueMinimoNumerico < 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 16 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 17 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `        mensagem: 'estoque_minimo deve ser numero maior ou igual a zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 20 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 21 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 22 | `    const produto = await produtoModel.criar({` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 23 | `      nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 24 | `      sku,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `      unidade: unidade \|\| 'un',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      estoqueAtual: 0,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `      estoqueMinimo: estoqueMinimoNumerico` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 30 | `    return response.status(201).json({` | Retorna um valor para quem chamou a função. |
| 31 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 32 | `      mensagem: 'Produto criado com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `      dados: produto` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `    if (error.code === 'ER_DUP_ENTRY') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 37 | `      return response.status(409).json({` | Retorna um valor para quem chamou a função. |
| 38 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `        mensagem: 'Ja existe produto com este sku'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 42 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 43 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 44 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 45 | `      mensagem: 'Erro ao criar produto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 49 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 50 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 51 | `async function listar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 52 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 53 | `    const produtos = await produtoModel.listar();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 54 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 55 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 56 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `      dados: produtos` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 61 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 62 | `      mensagem: 'Erro ao listar produtos',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 63 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 64 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 65 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 66 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 67 | `async function atualizar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 68 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 69 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 70 | `    const { nome, sku, unidade, estoque_minimo } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 71 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 72 | `    if (!id \|\| !nome \|\| !sku \|\| !unidade \|\| typeof estoque_minimo === 'undefined') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 73 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 74 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `        mensagem: 'id, nome, sku, unidade e estoque_minimo sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 77 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 78 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 79 | `    const estoqueMinimoNumerico = Number(estoque_minimo);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 80 | `    if (Number.isNaN(estoqueMinimoNumerico) \|\| estoqueMinimoNumerico < 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 81 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 82 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 83 | `        mensagem: 'estoque_minimo deve ser numero maior ou igual a zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 84 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 86 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 87 | `    const produtoExistente = await produtoModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 88 | `    if (!produtoExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 89 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 90 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 91 | `        mensagem: 'Produto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 92 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 93 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 94 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 95 | `    await produtoModel.atualizar(id, {` | Espera uma operação assíncrona terminar antes de continuar. |
| 96 | `      nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 97 | `      sku,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 98 | `      unidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 99 | `      estoqueMinimo: estoqueMinimoNumerico` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 101 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 102 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 103 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 104 | `      mensagem: 'Produto atualizado com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 105 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 106 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 107 | `    if (error.code === 'ER_DUP_ENTRY') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 108 | `      return response.status(409).json({` | Retorna um valor para quem chamou a função. |
| 109 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 110 | `        mensagem: 'Ja existe produto com este sku'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 111 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 112 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 113 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 114 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 115 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 116 | `      mensagem: 'Erro ao atualizar produto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 117 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 118 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 119 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 120 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 121 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 122 | `async function remover(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 123 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 124 | `    const id = Number(request.params.id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 125 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 126 | `    if (!id) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 127 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 128 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 129 | `        mensagem: 'id invalido'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 130 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 131 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 132 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 133 | `    const produtoExistente = await produtoModel.buscarPorId(id);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 134 | `    if (!produtoExistente) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 135 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 136 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 137 | `        mensagem: 'Produto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 138 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 139 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 140 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 141 | `    await produtoModel.remover(id);` | Espera uma operação assíncrona terminar antes de continuar. |
| 142 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 143 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 144 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 145 | `      mensagem: 'Produto removido com sucesso'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 146 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 147 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 148 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 149 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 150 | `      mensagem: 'Erro ao remover produto',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 151 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 152 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 153 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 154 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 155 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 156 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 157 | `  listar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 158 | `  atualizar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 159 | `  remover` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 160 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 161 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
