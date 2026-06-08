# backend\src\models\doacaoModel.js

Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.

| Linha | Código | Explicação |
|---:|---|---|
| 1 | `const db = require('../config/db');` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 2 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 3 | `const TIPOS_ITEM = ['alimentos', 'vestuario', 'higiene'];` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 4 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 5 | `async function criar({` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 6 | `  tipoDoacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 7 | `  descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 8 | `  valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 9 | `  produtoId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 10 | `  quantidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 11 | `  dataDoacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 12 | `  usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 13 | `  contaCaixaId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 14 | `}) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 15 | `  const conexao = await db.getConnection();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 16 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 17 | `  try {` | Inicia um bloco protegido para tentar executar uma operação que pode falhar. |
| 18 | `    await conexao.beginTransaction();` | Espera uma operação assíncrona terminar antes de continuar. |
| 19 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 20 | `    const data = dataDoacao \|\| new Date();` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 21 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 22 | `    const [resultadoDoacao] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 23 | `      \`INSERT INTO doacoes` | SQL de inserção: cria um novo registro no banco. |
| 24 | `       (tipo_doacao, descricao, valor, produto_id, quantidade, data_doacao, usuario_id, conta_caixa_id)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 25 | `       VALUES (?, ?, ?, ?, ?, ?, ?, ?)\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 26 | `      [` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 27 | `        tipoDoacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 28 | `        descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 29 | `        tipoDoacao === 'dinheiro' ? Number(valor) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 30 | `        TIPOS_ITEM.includes(tipoDoacao) ? Number(produtoId) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 31 | `        TIPOS_ITEM.includes(tipoDoacao) ? Number(quantidade) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 32 | `        data,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 33 | `        usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 34 | `        tipoDoacao === 'dinheiro' ? Number(contaCaixaId) : null` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 35 | `      ]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 36 | `    );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 37 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 38 | `    let movimentoCaixa = null;` | Declara uma variável que pode ter o valor alterado depois. |
| 39 | `    let movimentoEstoque = null;` | Declara uma variável que pode ter o valor alterado depois. |
| 40 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 41 | `    if (tipoDoacao === 'dinheiro') {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 42 | `      const [resultadoCaixa] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 43 | `        \`INSERT INTO movimentacoes_caixa` | SQL de inserção: cria um novo registro no banco. |
| 44 | `         (tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 45 | `         VALUES ('entrada', ?, 'doacao', ?, ?, ?, ?)\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 46 | `        [` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 47 | `          \`Doacao em dinheiro: ${descricao}\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 48 | `          Number(valor),` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 49 | `          data,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 50 | `          usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 51 | `          Number(contaCaixaId)` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 52 | `        ]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 53 | `      );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 54 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 55 | `      movimentoCaixa = {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 56 | `        id: resultadoCaixa.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 57 | `        tipo: 'entrada',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 58 | `        categoria: 'doacao',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 59 | `        valor: Number(valor),` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 60 | `        conta_caixa_id: Number(contaCaixaId)` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 61 | `      };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 62 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 63 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 64 | `    if (TIPOS_ITEM.includes(tipoDoacao)) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 65 | `      const [produtos] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 66 | `        \`SELECT id, estoque_atual FROM produtos WHERE id = ? LIMIT 1\`,` | SQL de consulta: busca dados no banco. |
| 67 | `        [Number(produtoId)]` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 68 | `      );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 69 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 70 | `      if (!produtos.length) {` | Inicia uma condição: o código interno só roda se a regra for verdadeira. |
| 71 | `        throw new Error('PRODUTO_NAO_ENCONTRADO');` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 72 | `      }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 73 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 74 | `      const estoqueAtual = Number(produtos[0].estoque_atual);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 75 | `      const qtd = Number(quantidade);` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 76 | `      const novoEstoque = estoqueAtual + qtd;` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 77 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 78 | `      const [resultadoMovEstoque] = await conexao.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 79 | `        \`INSERT INTO movimentacoes_estoque` | SQL de inserção: cria um novo registro no banco. |
| 80 | `         (produto_id, tipo, quantidade, motivo, data_movimento, usuario_id)` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 81 | `         VALUES (?, 'entrada', ?, ?, ?, ?)\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 82 | `        [` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 83 | `          Number(produtoId),` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 84 | `          qtd,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 85 | `          \`Doacao (${tipoDoacao}): ${descricao}\`,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 86 | `          data,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 87 | `          usuarioId` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 88 | `        ]` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 89 | `      );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 90 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 91 | `      await conexao.query(` | Espera uma operação assíncrona terminar antes de continuar. |
| 92 | `        \`UPDATE produtos SET estoque_atual = ? WHERE id = ?\`,` | SQL de atualização: altera dados já existentes no banco. |
| 93 | `        [novoEstoque, Number(produtoId)]` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 94 | `      );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 95 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 96 | `      movimentoEstoque = {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 97 | `        id: resultadoMovEstoque.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 98 | `        produto_id: Number(produtoId),` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 99 | `        tipo: 'entrada',` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 100 | `        quantidade: qtd,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 101 | `        estoque_atual: novoEstoque` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 102 | `      };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 103 | `    }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 104 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 105 | `    await conexao.commit();` | Espera uma operação assíncrona terminar antes de continuar. |
| 106 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 107 | `    return {` | Retorna um valor para quem chamou a função. |
| 108 | `      id: resultadoDoacao.insertId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 109 | `      tipo_doacao: tipoDoacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 110 | `      descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 111 | `      valor: tipoDoacao === 'dinheiro' ? Number(valor) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 112 | `      conta_caixa_id: tipoDoacao === 'dinheiro' ? Number(contaCaixaId) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 113 | `      produto_id: TIPOS_ITEM.includes(tipoDoacao) ? Number(produtoId) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 114 | `      quantidade: TIPOS_ITEM.includes(tipoDoacao) ? Number(quantidade) : null,` | Converte um valor para número, geralmente antes de enviar ou calcular. |
| 115 | `      data_doacao: data,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 116 | `      usuario_id: usuarioId,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 117 | `      movimento_caixa: movimentoCaixa,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 118 | `      movimento_estoque: movimentoEstoque` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 119 | `    };` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 120 | `  } catch (error) {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 121 | `    await conexao.rollback();` | Espera uma operação assíncrona terminar antes de continuar. |
| 122 | `    throw error;` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 123 | `  } finally {` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 124 | `    conexao.release();` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 125 | `  }` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 126 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 127 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 128 | `async function listar() {` | Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada. |
| 129 | `  const [rows] = await db.query(` | Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois. |
| 130 | `    \`SELECT` | SQL de consulta: busca dados no banco. |
| 131 | `      d.id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 132 | `      d.tipo_doacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 133 | `      d.descricao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 134 | `      d.valor,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 135 | `      d.conta_caixa_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 136 | `      COALESCE(cc.nome, 'Sem conta') AS conta_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 137 | `      d.produto_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 138 | `      p.nome AS produto_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 139 | `      d.quantidade,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 140 | `      d.data_doacao,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 141 | `      d.usuario_id,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 142 | `      u.nome AS usuario_nome,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 143 | `      d.created_at` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 144 | `     FROM doacoes d` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 145 | `     INNER JOIN usuarios u ON u.id = d.usuario_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 146 | `     LEFT JOIN contas_caixa cc ON cc.id = d.conta_caixa_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 147 | `     LEFT JOIN produtos p ON p.id = d.produto_id` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 148 | `     ORDER BY d.data_doacao DESC, d.id DESC\`` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 149 | `  );` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 150 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 151 | `  return rows;` | Retorna um valor para quem chamou a função. |
| 152 | `}` | Fecha ou organiza um bloco de código iniciado anteriormente. |
| 153 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
| 154 | `module.exports = {` | Exporta funções ou objetos para que outros arquivos possam importar. |
| 155 | `  criar,` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 156 | `  listar` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 157 | `};` | Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo. |
| 158 | ` ` | Linha em branco usada para separar blocos e melhorar a leitura. |
