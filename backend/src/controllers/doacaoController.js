const doacaoModel = require('../models/doacaoModel')

const TIPOS_VALIDOS = ['dinheiro', 'alimentos', 'vestuario', 'higiene']
const TIPOS_ITEM = ['alimentos', 'vestuario', 'higiene']

async function criar(request, response) {
  try {
    const {
      tipo_doacao,
      descricao,
      valor,
      produto_id,
      quantidade,
      data_doacao
    } = request.body

    if (!tipo_doacao || !descricao) {
      return response.status(400).json({
        ok: false,
        mensagem: 'tipo_doacao e descricao sao obrigatorios'
      })
    }

    if (!TIPOS_VALIDOS.includes(tipo_doacao)) {
      return response.status(400).json({
        ok: false,
        mensagem: 'tipo_doacao invalido'
      })
    }

    if (tipo_doacao === 'dinheiro') {
      const valorNumerico = Number(valor)
      if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
        return response.status(400).json({
          ok: false,
          mensagem: 'Para doacao em dinheiro, valor deve ser maior que zero'
        })
      }
    }

    if (TIPOS_ITEM.includes(tipo_doacao)) {
      const produtoIdNumero = Number(produto_id)
      const quantidadeNumero = Number(quantidade)

      if (!produtoIdNumero || Number.isNaN(produtoIdNumero)) {
        return response.status(400).json({
          ok: false,
          mensagem: 'Para doacao de itens, produto_id e obrigatorio'
        })
      }

      if (Number.isNaN(quantidadeNumero) || quantidadeNumero <= 0) {
        return response.status(400).json({
          ok: false,
          mensagem: 'Para doacao de itens, quantidade deve ser maior que zero'
        })
      }
    }

    const doacao = await doacaoModel.criar({
      tipoDoacao: tipo_doacao,
      descricao,
      valor,
      produtoId: produto_id,
      quantidade,
      dataDoacao: data_doacao || new Date(),
      usuarioId: request.usuario.id
    })

    return response.status(201).json({
      ok: true,
      mensagem: 'Doacao registrada com sucesso',
      dados: doacao
    })
  } catch (error) {
    if (error.message === 'PRODUTO_NAO_ENCONTRADO') {
      return response.status(404).json({
        ok: false,
        mensagem: 'Produto nao encontrado'
      })
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao registrar doacao',
      erro: error.message
    })
  }
}

async function listar(request, response) {
  try {
    const itens = await doacaoModel.listar()
    return response.status(200).json({
      ok: true,
      dados: itens
    })
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar doacoes',
      erro: error.message
    })
  }
}

module.exports = {
  criar,
  listar
}
