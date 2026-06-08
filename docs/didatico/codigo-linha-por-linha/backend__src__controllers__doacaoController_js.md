# backend\src\controllers\doacaoController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const doacaoModel = require('../models/doacaoModel')` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | `const contaCaixaModel = require('../models/contaCaixaModel')` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 3 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 4 | `const TIPOS_VALIDOS = ['dinheiro', 'alimentos', 'vestuario', 'higiene']` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 5 | `const TIPOS_ITEM = ['alimentos', 'vestuario', 'higiene']` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 6 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 7 | `async function criar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 8 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 9 | `    const {` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 10 | `      tipo_doacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `      descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `      valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `      conta_caixa_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `      produto_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `      quantidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 16 | `      data_doacao` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 17 | `    } = request.body` | Lê dados enviados pelo frontend no corpo da requisição. |
| 18 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 19 | `    if (!tipo_doacao \|\| !descricao) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 20 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 21 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 22 | `        mensagem: 'tipo_doacao e descricao sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 23 | `      })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 24 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 25 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 26 | `    if (!TIPOS_VALIDOS.includes(tipo_doacao)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 27 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 28 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `        mensagem: 'tipo_doacao invalido'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 30 | `      })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 31 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 32 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 33 | `    if (tipo_doacao === 'dinheiro') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 34 | `      const valorNumerico = Number(valor)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 35 | `      if (Number.isNaN(valorNumerico) \|\| valorNumerico <= 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 36 | `        return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 37 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 38 | `          mensagem: 'Para doacao em dinheiro, valor deve ser maior que zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `        })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 41 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 42 | `      const contaIdNumero = Number(conta_caixa_id)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 43 | `      if (!contaIdNumero \|\| Number.isNaN(contaIdNumero)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 44 | `        return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 45 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `          mensagem: 'Para doacao em dinheiro, conta_caixa_id e obrigatorio'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `        })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 49 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 50 | `      const conta = await contaCaixaModel.buscarPorId(contaIdNumero)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 51 | `      if (!conta \|\| Number(conta.ativo) !== 1) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 52 | `        return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 53 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `          mensagem: 'Conta de caixa nao encontrada ou inativa'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `        })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 57 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 58 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 59 | `    if (TIPOS_ITEM.includes(tipo_doacao)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 60 | `      const produtoIdNumero = Number(produto_id)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 61 | `      const quantidadeNumero = Number(quantidade)` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 62 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 63 | `      if (!produtoIdNumero \|\| Number.isNaN(produtoIdNumero)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 64 | `        return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 65 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 66 | `          mensagem: 'Para doacao de itens, produto_id e obrigatorio'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 67 | `        })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 68 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 69 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 70 | `      if (Number.isNaN(quantidadeNumero) \|\| quantidadeNumero <= 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 71 | `        return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 72 | `          ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `          mensagem: 'Para doacao de itens, quantidade deve ser maior que zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 74 | `        })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 76 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 77 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 78 | `    const doacao = await doacaoModel.criar({` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 79 | `      tipoDoacao: tipo_doacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 80 | `      descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 81 | `      valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 82 | `      produtoId: produto_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 83 | `      quantidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 84 | `      dataDoacao: data_doacao \|\| new Date(),` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | `      usuarioId: request.usuario.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 86 | `      contaCaixaId: conta_caixa_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 87 | `    })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 88 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 89 | `    return response.status(201).json({` | Retorna um valor para quem chamou a função. |
| 90 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 91 | `      mensagem: 'Doacao registrada com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 92 | `      dados: doacao` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 93 | `    })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 94 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 95 | `    if (error.message === 'PRODUTO_NAO_ENCONTRADO') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 96 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 97 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 98 | `        mensagem: 'Produto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 99 | `      })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 101 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 102 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 103 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 104 | `      mensagem: 'Erro ao registrar doacao',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 105 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 106 | `    })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 107 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 108 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 109 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 110 | `async function listar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 111 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 112 | `    const itens = await doacaoModel.listar()` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 113 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 114 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 115 | `      dados: itens` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 116 | `    })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 117 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 118 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 119 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 120 | `      mensagem: 'Erro ao listar doacoes',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 121 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 122 | `    })` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 123 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 124 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 125 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 126 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 127 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 128 | `  listar` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 129 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 130 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
