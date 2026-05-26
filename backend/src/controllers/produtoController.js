const produtoModel = require('../models/produtoModel');

async function criar(request, response) {
  try {
    const { nome, sku, unidade, estoque_minimo } = request.body;

    if (!nome || !sku) {
      return response.status(400).json({
        ok: false,
        mensagem: 'nome e sku sao obrigatorios'
      });
    }

    const estoqueMinimoNumerico = Number(estoque_minimo || 0);
    if (Number.isNaN(estoqueMinimoNumerico) || estoqueMinimoNumerico < 0) {
      return response.status(400).json({
        ok: false,
        mensagem: 'estoque_minimo deve ser numero maior ou igual a zero'
      });
    }

    const produto = await produtoModel.criar({
      nome,
      sku,
      unidade: unidade || 'un',
      estoqueAtual: 0,
      estoqueMinimo: estoqueMinimoNumerico
    });

    return response.status(201).json({
      ok: true,
      mensagem: 'Produto criado com sucesso',
      dados: produto
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe produto com este sku'
      });
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar produto',
      erro: error.message
    });
  }
}

async function listar(request, response) {
  try {
    const produtos = await produtoModel.listar();

    return response.status(200).json({
      ok: true,
      dados: produtos
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar produtos',
      erro: error.message
    });
  }
}
async function atualizar(request, response) {
  try {
    const id = Number(request.params.id);
    const { nome, sku, unidade, estoque_minimo } = request.body;

    if (!id || !nome || !sku || !unidade || typeof estoque_minimo === 'undefined') {
      return response.status(400).json({
        ok: false,
        mensagem: 'id, nome, sku, unidade e estoque_minimo sao obrigatorios'
      });
    }

    const estoqueMinimoNumerico = Number(estoque_minimo);
    if (Number.isNaN(estoqueMinimoNumerico) || estoqueMinimoNumerico < 0) {
      return response.status(400).json({
        ok: false,
        mensagem: 'estoque_minimo deve ser numero maior ou igual a zero'
      });
    }

    const produtoExistente = await produtoModel.buscarPorId(id);
    if (!produtoExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Produto nao encontrado'
      });
    }

    await produtoModel.atualizar(id, {
      nome,
      sku,
      unidade,
      estoqueMinimo: estoqueMinimoNumerico
    });

    return response.status(200).json({
      ok: true,
      mensagem: 'Produto atualizado com sucesso'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe produto com este sku'
      });
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao atualizar produto',
      erro: error.message
    });
  }
}

async function remover(request, response) {
  try {
    const id = Number(request.params.id);

    if (!id) {
      return response.status(400).json({
        ok: false,
        mensagem: 'id invalido'
      });
    }

    const produtoExistente = await produtoModel.buscarPorId(id);
    if (!produtoExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Produto nao encontrado'
      });
    }

    await produtoModel.remover(id);

    return response.status(200).json({
      ok: true,
      mensagem: 'Produto removido com sucesso'
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao remover produto',
      erro: error.message
    });
  }
}
module.exports = {
  criar,
  listar,
  atualizar,
  remover
};
