const caixaModel = require('../models/caixaModel')
const contaCaixaModel = require('../models/contaCaixaModel')

function validarDados({ tipo, descricao, categoria, valor, contaCaixaId }) {
  if (
    !tipo ||
    !descricao ||
    !categoria ||
    typeof valor === 'undefined' ||
    !contaCaixaId
  ) {
    return 'tipo, descricao, categoria, valor e conta_caixa_id sao obrigatorios'
  }

  if (!['entrada', 'saida'].includes(tipo)) {
    return 'tipo deve ser entrada ou saida'
  }

  const valorNumerico = Number(valor)
  if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
    return 'valor deve ser um numero maior que zero'
  }

  const contaNumerica = Number(contaCaixaId)
  if (Number.isNaN(contaNumerica) || contaNumerica <= 0) {
    return 'conta_caixa_id invalido'
  }

  return null
}

async function criar(request, response) {
  try {
    const { tipo, descricao, categoria, valor, data_movimento, conta_caixa_id } =
      request.body

    const erroValidacao = validarDados({
      tipo,
      descricao,
      categoria,
      valor,
      contaCaixaId: conta_caixa_id
    })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    const conta = await contaCaixaModel.buscarPorId(Number(conta_caixa_id))
    if (!conta || Number(conta.ativo) !== 1) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Conta de caixa nao encontrada ou inativa'
      })
    }

    const movimentacao = await caixaModel.criar({
      tipo,
      descricao,
      categoria,
      valor: Number(valor),
      dataMovimento: data_movimento || new Date(),
      usuarioId: request.usuario.id,
      contaCaixaId: Number(conta_caixa_id)
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
    const contaIdQuery = request.query.conta_id
    const contaId =
      contaIdQuery && contaIdQuery !== 'geral'
        ? Number(contaIdQuery)
        : null
    const busca = request.query.busca ? String(request.query.busca).trim() : ''

    if (contaIdQuery && contaIdQuery !== 'geral' && (!contaId || Number.isNaN(contaId))) {
      return response.status(400).json({
        ok: false,
        mensagem: 'conta_id invalido'
      })
    }

    const itens = await caixaModel.listar({ contaId, busca })
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
    const { tipo, descricao, categoria, valor, data_movimento, conta_caixa_id } =
      request.body

    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    const erroValidacao = validarDados({
      tipo,
      descricao,
      categoria,
      valor,
      contaCaixaId: conta_caixa_id
    })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    const conta = await contaCaixaModel.buscarPorId(Number(conta_caixa_id))
    if (!conta || Number(conta.ativo) !== 1) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Conta de caixa nao encontrada ou inativa'
      })
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
      dataMovimento: data_movimento || existente.data_movimento,
      contaCaixaId: Number(conta_caixa_id)
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
    const contaIdQuery = request.query.conta_id
    const contaId =
      contaIdQuery && contaIdQuery !== 'geral'
        ? Number(contaIdQuery)
        : null

    if (contaIdQuery && contaIdQuery !== 'geral' && (!contaId || Number.isNaN(contaId))) {
      return response.status(400).json({
        ok: false,
        mensagem: 'conta_id invalido'
      })
    }

    const dados = await caixaModel.obterSaldo({ contaId })
    const porConta = await caixaModel.obterSaldoPorConta()

    const contaSelecionada = contaIdQuery || 'geral'

    const resposta = {
      ...dados,
      conta_selecionada: contaSelecionada,
      por_conta: porConta
    }
    return response.status(200).json({ ok: true, dados: resposta })
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
