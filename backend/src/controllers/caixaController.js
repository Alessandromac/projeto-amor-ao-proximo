const caixaModel = require('../models/caixaModel')

function validarDados({ tipo, descricao, categoria, valor }) {
  if (!tipo || !descricao || !categoria || typeof valor === 'undefined') {
    return 'tipo, descricao, categoria e valor sao obrigatorios'
  }

  if (!['entrada', 'saida'].includes(tipo)) {
    return 'tipo deve ser entrada ou saida'
  }

  const valorNumerico = Number(valor)
  if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
    return 'valor deve ser um numero maior que zero'
  }

  return null
}

async function criar(request, response) {
  try {
    const { tipo, descricao, categoria, valor, data_movimento } = request.body

    const erroValidacao = validarDados({ tipo, descricao, categoria, valor })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    const movimentacao = await caixaModel.criar({
      tipo,
      descricao,
      categoria,
      valor: Number(valor),
      dataMovimento: data_movimento || new Date(),
      usuarioId: request.usuario.id
    })

    return response.status(201).json({
      ok: true,
      mensagem: 'Movimentacao de caixa criada com sucesso',
      dados: movimentacao
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar movimentacao de caixa',
      erro: error.message
    })
  }
}

async function listar(request, response) {
  try {
    const itens = await caixaModel.listar()
    return response.status(200).json({ ok: true, dados: itens })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar movimentacoes de caixa',
      erro: error.message
    })
  }
}

async function atualizar(request, response) {
  try {
    const id = Number(request.params.id)
    const { tipo, descricao, categoria, valor, data_movimento } = request.body

    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    const erroValidacao = validarDados({ tipo, descricao, categoria, valor })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    const existente = await caixaModel.buscarPorId(id)
    if (!existente) {
      return response
        .status(404)
        .json({ ok: false, mensagem: 'Movimentacao nao encontrada' })
    }

    await caixaModel.atualizar(id, {
      tipo,
      descricao,
      categoria,
      valor: Number(valor),
      dataMovimento: data_movimento || existente.data_movimento
    })

    return response.status(200).json({
      ok: true,
      mensagem: 'Movimentacao atualizada com sucesso'
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao atualizar movimentacao',
      erro: error.message
    })
  }
}

async function remover(request, response) {
  try {
    const id = Number(request.params.id)

    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    const existente = await caixaModel.buscarPorId(id)
    if (!existente) {
      return response
        .status(404)
        .json({ ok: false, mensagem: 'Movimentacao nao encontrada' })
    }

    await caixaModel.remover(id)

    return response.status(200).json({
      ok: true,
      mensagem: 'Movimentacao removida com sucesso'
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao remover movimentacao',
      erro: error.message
    })
  }
}

async function saldo(request, response) {
  try {
    const dados = await caixaModel.obterSaldo()
    return response.status(200).json({ ok: true, dados })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao consultar saldo',
      erro: error.message
    })
  }
}

module.exports = {
  criar,
  listar,
  atualizar,
  remover,
  saldo
}
