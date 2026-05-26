const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

async function login(request, response) {
  try {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({
        ok: false,
        mensagem: 'Email e senha sao obrigatorios'
      });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return response.status(401).json({
        ok: false,
        mensagem: 'Email ou senha invalidos'
      });
    }

    if (Number(usuario.ativo) !== 1) {
      return response.status(403).json({
        ok: false,
        mensagem: 'Usuario inativo. Procure um administrador'
      });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaConfere) {
      return response.status(401).json({
        ok: false,
        mensagem: 'Email ou senha invalidos'
      });
    }

    const token = jwt.sign(
      {
        sub: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return response.status(200).json({
      ok: true,
      mensagem: 'Login realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  } catch (error) {
    return response.status(500).json({
      ok: false,
      mensagem: 'Erro ao fazer login',
      erro: error.message
    });
  }
}

module.exports = {
  login
};
