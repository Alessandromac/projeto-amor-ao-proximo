const estoqueModel = require('../models/estoqueModel');

async function movimentar(request, response) {
  try {
    const { produto_id, tipo, quantidade, motivo } = request.body;

    if (!produto_id || !tipo || typeof quantidade === 'undefined') {
      return response.status(400).json({
        ok: false,
        mensagem: 'produto_id, tipo e quantidade sao obrigatorios'
      });
    }

    if (!['entrada', 'saida'].includes(tipo)) {
      return response.status(400).json({
        ok: false,
        mensagem: 'tipo deve ser entrada ou saida'
      });
    }

    const qtd = Number(quantidade);
    if (Number.isNaN(qtd) || qtd <= 0) {
      return response.status(400).json({
        ok: false,
        mensagem: 'quantidade deve ser numero maior que zero'
      });
    }

    const movimentacao = await estoqueModel.criarMovimentacao({
      produtoId: Number(produto_id),
      tipo,
      quantidade: qtd,
      motivo,
      usuarioId: request.usuario.id
    });

    return response.status(201).json({
      ok: true,
      mensagem: 'Movimentacao de estoque registrada com sucesso',
      dados: movimentacao
    });
  } catch (error) {
    if (error.message === 'PRODUTO_NAO_ENCONTRADO') {
      return response.status(404).json({
        ok: false,
        mensagem: 'Produto nao encontrado'
      });
    }

    if (error.message === 'ESTOQUE_INSUFICIENTE') {
      return response.status(400).json({
        ok: false,
        mensagem: 'Estoque insuficiente para saida'
      });
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao movimentar estoque',
      erro: error.message
    });
  }
}
async function listarMovimentacoes(request, response) {
  try {
    const itens = await estoqueModel.listarMovimentacoes();

    return response.status(200).json({
      ok: true,
      dados: itens
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar movimentacoes de estoque',
      erro: error.message
    });
  }
}

module.exports = {
  movimentar,
  listarMovimentacoes
};
