// Importa model do caixa (camada que fala direto com banco).
const caixaModel = require('../../models/caixaModel')

// Função auxiliar de validação de dados de entrada.
function validarDados({ tipo, descricao, categoria, valor }) {
  // Verifica campos obrigatórios.
  if (!tipo || !descricao || !categoria || typeof valor === 'undefined') {
    return 'tipo, descricao, categoria e valor sao obrigatorios'
  }

  // Garante que tipo seja apenas entrada ou saida.
  if (!['entrada', 'saida'].includes(tipo)) {
    return 'tipo deve ser entrada ou saida'
  }

  // Converte valor para número e valida > 0.
  const valorNumerico = Number(valor)
  if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
    return 'valor deve ser um numero maior que zero'
  }

  // Sem erro de validação.
  return null
}

// Controller: cria movimentação de caixa.
async function criar(request, response) {
  try {
    // Lê dados enviados no body.
    const { tipo, descricao, categoria, valor, data_movimento } = request.body

    // Valida payload.
    const erroValidacao = validarDados({ tipo, descricao, categoria, valor })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    // Chama model para inserir no banco.
    const movimentacao = await caixaModel.criar({
      tipo,
      descricao,
      categoria,
      valor: Number(valor),
      dataMovimento: data_movimento || new Date(),
      usuarioId: request.usuario.id
    })

    // Retorna sucesso com dados criados.
    return response.status(201).json({
      ok: true,
      mensagem: 'Movimentacao de caixa criada com sucesso',
      dados: movimentacao
    })
  } catch (error) {
    // Erro interno não tratado.
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar movimentacao de caixa',
      erro: error.message
    })
  }
}

// Controller: lista movimentações.
async function listar(request, response) {
  try {
    // Busca lista no model.
    const itens = await caixaModel.listar()

    return response.status(200).json({
      ok: true,
      dados: itens
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar movimentacoes de caixa',
      erro: error.message
    })
  }
}

// Controller: atualiza movimentação existente.
async function atualizar(request, response) {
  try {
    // ID vem na rota /caixa/:id.
    const id = Number(request.params.id)

    // Dados vêm no body.
    const { tipo, descricao, categoria, valor, data_movimento } = request.body

    // Valida id.
    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    // Valida payload.
    const erroValidacao = validarDados({ tipo, descricao, categoria, valor })
    if (erroValidacao) {
      return response.status(400).json({ ok: false, mensagem: erroValidacao })
    }

    // Busca registro para confirmar existência.
    const existente = await caixaModel.buscarPorId(id)
    if (!existente) {
      return response
        .status(404)
        .json({ ok: false, mensagem: 'Movimentacao nao encontrada' })
    }

    // Atualiza no banco.
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

// Controller: remove movimentação.
async function remover(request, response) {
  try {
    const id = Number(request.params.id)

    if (!id) {
      return response.status(400).json({ ok: false, mensagem: 'id invalido' })
    }

    // Confirma se existe antes de excluir.
    const existente = await caixaModel.buscarPorId(id)
    if (!existente) {
      return response
        .status(404)
        .json({ ok: false, mensagem: 'Movimentacao nao encontrada' })
    }

    // Exclui no banco.
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

// Controller: retorna resumo financeiro do caixa.
async function saldo(request, response) {
  try {
    // Model calcula total_entradas, total_saidas e saldo_atual.
    const dados = await caixaModel.obterSaldo()

    return response.status(200).json({
      ok: true,
      dados
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao consultar saldo',
      erro: error.message
    })
  }
}

// Exporta funções para uso nas rotas.
module.exports = {
  criar,
  listar,
  atualizar,
  remover,
  saldo
}
