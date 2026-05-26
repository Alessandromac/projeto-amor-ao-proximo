const db = require('../config/db');

async function criarMovimentacao({ produtoId, tipo, quantidade, motivo, usuarioId }) {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    const [produtos] = await conexao.query(
      'SELECT id, estoque_atual FROM produtos WHERE id = ? LIMIT 1',
      [produtoId]
    );

    if (!produtos.length) throw new Error('PRODUTO_NAO_ENCONTRADO');

    const estoqueAtual = Number(produtos[0].estoque_atual);
    const qtd = Number(quantidade);

    if (tipo === 'saida' && estoqueAtual < qtd) throw new Error('ESTOQUE_INSUFICIENTE');

    const novoEstoque = tipo === 'entrada' ? estoqueAtual + qtd : estoqueAtual - qtd;

    const [mov] = await conexao.query(
      `INSERT INTO movimentacoes_estoque
       (produto_id, tipo, quantidade, motivo, data_movimento, usuario_id)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [produtoId, tipo, qtd, motivo || null, usuarioId]
    );

    await conexao.query('UPDATE produtos SET estoque_atual = ? WHERE id = ?', [novoEstoque, produtoId]);

    await conexao.commit();

    return {
      id: mov.insertId,
      produto_id: produtoId,
      tipo,
      quantidade: qtd,
      motivo: motivo || null,
      usuario_id: usuarioId,
      estoque_atual: novoEstoque
    };
  } catch (error) {
    await conexao.rollback();
    throw error;
  } finally {
    conexao.release();
  }
}

async function listarMovimentacoes() {
  const [rows] = await db.query(`
    SELECT
      me.id, me.produto_id, p.nome AS produto_nome, p.sku AS produto_sku,
      me.tipo, me.quantidade, me.motivo, me.data_movimento,
      me.usuario_id, u.nome AS usuario_nome
    FROM movimentacoes_estoque me
    INNER JOIN produtos p ON p.id = me.produto_id
    INNER JOIN usuarios u ON u.id = me.usuario_id
    ORDER BY me.data_movimento DESC, me.id DESC
  `);

  return rows;
}

module.exports = { criarMovimentacao, listarMovimentacoes };
