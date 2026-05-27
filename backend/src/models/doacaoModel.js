const db = require('../config/db');

const TIPOS_ITEM = ['alimentos', 'vestuario', 'higiene'];

async function criar({
  tipoDoacao,
  descricao,
  valor,
  produtoId,
  quantidade,
  dataDoacao,
  usuarioId,
  contaCaixaId
}) {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    const data = dataDoacao || new Date();

    const [resultadoDoacao] = await conexao.query(
      `INSERT INTO doacoes
       (tipo_doacao, descricao, valor, produto_id, quantidade, data_doacao, usuario_id, conta_caixa_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        tipoDoacao,
        descricao,
        tipoDoacao === 'dinheiro' ? Number(valor) : null,
        TIPOS_ITEM.includes(tipoDoacao) ? Number(produtoId) : null,
        TIPOS_ITEM.includes(tipoDoacao) ? Number(quantidade) : null,
        data,
        usuarioId,
        tipoDoacao === 'dinheiro' ? Number(contaCaixaId) : null
      ]
    );

    let movimentoCaixa = null;
    let movimentoEstoque = null;

    if (tipoDoacao === 'dinheiro') {
      const [resultadoCaixa] = await conexao.query(
        `INSERT INTO movimentacoes_caixa
         (tipo, descricao, categoria, valor, data_movimento, usuario_id, conta_caixa_id)
         VALUES ('entrada', ?, 'doacao', ?, ?, ?, ?)`,
        [
          `Doacao em dinheiro: ${descricao}`,
          Number(valor),
          data,
          usuarioId,
          Number(contaCaixaId)
        ]
      );

      movimentoCaixa = {
        id: resultadoCaixa.insertId,
        tipo: 'entrada',
        categoria: 'doacao',
        valor: Number(valor),
        conta_caixa_id: Number(contaCaixaId)
      };
    }

    if (TIPOS_ITEM.includes(tipoDoacao)) {
      const [produtos] = await conexao.query(
        `SELECT id, estoque_atual FROM produtos WHERE id = ? LIMIT 1`,
        [Number(produtoId)]
      );

      if (!produtos.length) {
        throw new Error('PRODUTO_NAO_ENCONTRADO');
      }

      const estoqueAtual = Number(produtos[0].estoque_atual);
      const qtd = Number(quantidade);
      const novoEstoque = estoqueAtual + qtd;

      const [resultadoMovEstoque] = await conexao.query(
        `INSERT INTO movimentacoes_estoque
         (produto_id, tipo, quantidade, motivo, data_movimento, usuario_id)
         VALUES (?, 'entrada', ?, ?, ?, ?)`,
        [
          Number(produtoId),
          qtd,
          `Doacao (${tipoDoacao}): ${descricao}`,
          data,
          usuarioId
        ]
      );

      await conexao.query(
        `UPDATE produtos SET estoque_atual = ? WHERE id = ?`,
        [novoEstoque, Number(produtoId)]
      );

      movimentoEstoque = {
        id: resultadoMovEstoque.insertId,
        produto_id: Number(produtoId),
        tipo: 'entrada',
        quantidade: qtd,
        estoque_atual: novoEstoque
      };
    }

    await conexao.commit();

    return {
      id: resultadoDoacao.insertId,
      tipo_doacao: tipoDoacao,
      descricao,
      valor: tipoDoacao === 'dinheiro' ? Number(valor) : null,
      conta_caixa_id: tipoDoacao === 'dinheiro' ? Number(contaCaixaId) : null,
      produto_id: TIPOS_ITEM.includes(tipoDoacao) ? Number(produtoId) : null,
      quantidade: TIPOS_ITEM.includes(tipoDoacao) ? Number(quantidade) : null,
      data_doacao: data,
      usuario_id: usuarioId,
      movimento_caixa: movimentoCaixa,
      movimento_estoque: movimentoEstoque
    };
  } catch (error) {
    await conexao.rollback();
    throw error;
  } finally {
    conexao.release();
  }
}

async function listar() {
  const [rows] = await db.query(
    `SELECT
      d.id,
      d.tipo_doacao,
      d.descricao,
      d.valor,
      d.conta_caixa_id,
      COALESCE(cc.nome, 'Sem conta') AS conta_nome,
      d.produto_id,
      p.nome AS produto_nome,
      d.quantidade,
      d.data_doacao,
      d.usuario_id,
      u.nome AS usuario_nome,
      d.created_at
     FROM doacoes d
     INNER JOIN usuarios u ON u.id = d.usuario_id
     LEFT JOIN contas_caixa cc ON cc.id = d.conta_caixa_id
     LEFT JOIN produtos p ON p.id = d.produto_id
     ORDER BY d.data_doacao DESC, d.id DESC`
  );

  return rows;
}

module.exports = {
  criar,
  listar
};
