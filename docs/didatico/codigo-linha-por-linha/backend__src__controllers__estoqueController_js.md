# backend\src\controllers\estoqueController.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const estoqueModel = require('../models/estoqueModel');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `async function movimentar(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 4 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 5 | `    const { produto_id, tipo, quantidade, motivo } = request.body;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 6 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 7 | `    if (!produto_id \|\| !tipo \|\| typeof quantidade === 'undefined') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 8 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 9 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `        mensagem: 'produto_id, tipo e quantidade sao obrigatorios'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 13 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 14 | `    if (!['entrada', 'saida'].includes(tipo)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 15 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 16 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 17 | `        mensagem: 'tipo deve ser entrada ou saida'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 18 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 19 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 20 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 21 | `    const qtd = Number(quantidade);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 22 | `    if (Number.isNaN(qtd) \|\| qtd <= 0) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 23 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 24 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `        mensagem: 'quantidade deve ser numero maior que zero'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 28 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 29 | `    const movimentacao = await estoqueModel.criarMovimentacao({` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 30 | `      produtoId: Number(produto_id),` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 31 | `      tipo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 32 | `      quantidade: qtd,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `      motivo,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `      usuarioId: request.usuario.id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 35 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 37 | `    return response.status(201).json({` | Retorna um valor para quem chamou a função. |
| 38 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 39 | `      mensagem: 'Movimentacao de estoque registrada com sucesso',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 40 | `      dados: movimentacao` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 41 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 42 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 43 | `    if (error.message === 'PRODUTO_NAO_ENCONTRADO') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 44 | `      return response.status(404).json({` | Retorna um valor para quem chamou a função. |
| 45 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `        mensagem: 'Produto nao encontrado'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 49 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 50 | `    if (error.message === 'ESTOQUE_INSUFICIENTE') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 51 | `      return response.status(400).json({` | Retorna um valor para quem chamou a função. |
| 52 | `        ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 53 | `        mensagem: 'Estoque insuficiente para saida'` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 54 | `      });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 55 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 56 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 57 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 58 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `      mensagem: 'Erro ao movimentar estoque',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 60 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 61 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 62 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 63 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 64 | `async function listarMovimentacoes(request, response) {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 65 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 66 | `    const itens = await estoqueModel.listarMovimentacoes();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 67 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 68 | `    return response.status(200).json({` | Retorna um valor para quem chamou a função. |
| 69 | `      ok: true,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 70 | `      dados: itens` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 71 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 73 | `    return response.status(500).json({` | Retorna um valor para quem chamou a função. |
| 74 | `      ok: false,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 75 | `      mensagem: 'Erro ao listar movimentacoes de estoque',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 76 | `      erro: error.message` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 77 | `    });` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 78 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 79 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 80 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 81 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 82 | `  movimentar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 83 | `  listarMovimentacoes` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 84 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
