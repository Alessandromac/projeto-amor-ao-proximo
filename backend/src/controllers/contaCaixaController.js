const contaCaixaModel = require('../models/contaCaixaModel')

async function criar(request, response) {
  try {
    const { nome, ativo } = request.body

    if (!nome || !String(nome).trim()) {
      return response.status(400).json({
        ok: false,
        mensagem: 'nome da conta e obrigatorio'
      })
    }

    const nomeLimpo = String(nome).trim()
    const existente = await contaCaixaModel.buscarPorNome(nomeLimpo)
    if (existente) {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe uma conta com este nome'
      })
    }

    const conta = await contaCaixaModel.criar({
      nome: nomeLimpo,
      ativo: typeof ativo === 'undefined' ? 1 : Number(ativo) === 1
    })

    return response.status(201).json({
      ok: true,
      mensagem: 'Conta de caixa criada com sucesso',
      dados: conta
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar conta de caixa',
      erro: error.message
    })
  }
}

async function listar(request, response) {
  try {
    const incluirInativas = String(request.query.incluir_inativas || '0') === '1'
    const contas = await contaCaixaModel.listar({ incluirInativas })

    return response.status(200).json({
      ok: true,
      dados: [
        {
          id: 'geral',
          nome: 'Caixa Geral (soma de todas as contas)',
          ativo: 1
        },
        ...contas
      ]
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar contas de caixa',
      erro: error.message
    })
  }
}

async function atualizar(request, response) {
  try {
    const id = Number(request.params.id)
    const { nome, ativo } = request.body

    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    if (!nome || !String(nome).trim()) {
      return response.status(400).json({
        ok: false,
        mensagem: 'nome da conta e obrigatorio'
      })
    }

    const conta = await contaCaixaModel.buscarPorId(id)
    if (!conta) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Conta de caixa nao encontrada'
      })
    }

    const nomeLimpo = String(nome).trim()
    const comMesmoNome = await contaCaixaModel.buscarPorNome(nomeLimpo)
    if (comMesmoNome && Number(comMesmoNome.id) !== id) {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe uma conta com este nome'
      })
    }

    await contaCaixaModel.atualizar(id, {
      nome: nomeLimpo,
      ativo: typeof ativo === 'undefined' ? Number(conta.ativo) === 1 : Number(ativo) === 1
    })

    return response.status(200).json({
      ok: true,
      mensagem: 'Conta de caixa atualizada com sucesso'
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao atualizar conta de caixa',
      erro: error.message
    })
  }
}

module.exports = {
  criar,
  listar,
  atualizar
}

