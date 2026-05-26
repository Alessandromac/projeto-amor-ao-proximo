const gastoModel = require('../models/gastoModel');

async function criar(request, response) {
  try {
    const { descricao, categoria, valor, data_gasto, observacao } = request.body;

    if (!descricao || !categoria || typeof valor === 'undefined' || !data_gasto) {
      return response.status(400).json({
        ok: false,
        mensagem: 'descricao, categoria, valor e data_gasto sao obrigatorios'
      });
    }

    const valorNumerico = Number(valor);
    if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      return response.status(400).json({
        ok: false,
        mensagem: 'valor deve ser um numero maior que zero'
      });
    }

    const gasto = await gastoModel.criar({
      descricao,
      categoria,
      valor: valorNumerico,
      dataGasto: data_gasto,
      observacao,
      usuarioId: request.usuario.id
    });

    return response.status(201).json({
      ok: true,
      mensagem: 'Gasto criado com sucesso',
      dados: gasto
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar gasto',
      erro: error.message
    });
  }
}

async function listar(request, response) {
  try {
    const gastos = await gastoModel.listar();
    return response.status(200).json({
      ok: true,
      dados: gastos
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar gastos',
      erro: error.message
    });
  }
}

async function atualizar(request, response) {
  try {
    const id = Number(request.params.id);
    const { descricao, categoria, valor, data_gasto, observacao } = request.body;

    if (!id || !descricao || !categoria || typeof valor === 'undefined' || !data_gasto) {
      return response.status(400).json({
        ok: false,
        mensagem: 'id, descricao, categoria, valor e data_gasto sao obrigatorios'
      });
    }

    const valorNumerico = Number(valor);
    if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      return response.status(400).json({
        ok: false,
        mensagem: 'valor deve ser um numero maior que zero'
      });
    }

    const gastoExistente = await gastoModel.buscarPorId(id);
    if (!gastoExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Gasto nao encontrado'
      });
    }

    await gastoModel.atualizar(id, {
      descricao,
      categoria,
      valor: valorNumerico,
      dataGasto: data_gasto,
      observacao
    });

    return response.status(200).json({
      ok: true,
      mensagem: 'Gasto atualizado com sucesso'
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao atualizar gasto',
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

    const gastoExistente = await gastoModel.buscarPorId(id);
    if (!gastoExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Gasto nao encontrado'
      });
    }

    await gastoModel.remover(id);

    return response.status(200).json({
      ok: true,
      mensagem: 'Gasto removido com sucesso'
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao remover gasto',
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
