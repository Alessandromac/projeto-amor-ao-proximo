const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');

async function criar(request, response) {
  try {
    const { nome, email, senha, perfil } = request.body;

    if (!nome || !email || !senha) {
      return response.status(400).json({
        ok: false,
        mensagem: 'Nome, email e senha sao obrigatorios'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuarioCriado = await usuarioModel.criar({
      nome,
      email,
      senhaHash,
      perfil: perfil || 'viewer'
    });

    return response.status(201).json({
      ok: true,
      mensagem: 'Usuario criado com sucesso',
      dados: usuarioCriado
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe usuario com este email'
      });
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao criar usuario',
      erro: error.message
    });
  }
}

async function listar(request, response) {
  try {
    const usuarios = await usuarioModel.listar();

    return response.status(200).json({
      ok: true,
      dados: usuarios
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao listar usuarios',
      erro: error.message
    });
  }
}

async function atualizar(request, response) {
  try {
    const id = Number(request.params.id);
    const { nome, email, perfil, ativo } = request.body;

    if (!id || !nome || !email || !perfil || typeof ativo === 'undefined') {
      return response.status(400).json({
        ok: false,
        mensagem: 'id, nome, email, perfil e ativo sao obrigatorios'
      });
    }

    const usuarioExistente = await usuarioModel.buscarPorId(id);
    if (!usuarioExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Usuario nao encontrado'
      });
    }

    await usuarioModel.atualizar(id, { nome, email, perfil, ativo });

    return response.status(200).json({
      ok: true,
      mensagem: 'Usuario atualizado com sucesso'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        ok: false,
        mensagem: 'Ja existe usuario com este email'
      });
    }

    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao atualizar usuario',
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

    const usuarioExistente = await usuarioModel.buscarPorId(id);
    if (!usuarioExistente) {
      return response.status(404).json({
        ok: false,
        mensagem: 'Usuario nao encontrado'
      });
    }

    if (usuarioExistente.perfil === 'admin' && Number(usuarioExistente.ativo) === 1) {
      const totalAdminsAtivos = await usuarioModel.contarAdminsAtivos();

      if (totalAdminsAtivos <= 1) {
        return response.status(400).json({
          ok: false,
          mensagem: 'Nao e permitido excluir o ultimo admin ativo'
        });
      }
    }

    await usuarioModel.remover(id);

    return response.status(200).json({
      ok: true,
      mensagem: 'Usuario removido com sucesso'
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao remover usuario',
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
