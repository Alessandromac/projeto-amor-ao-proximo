const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} = require('@simplewebauthn/server');

const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const passkeyModel = require('../models/passkeyModel');

const challenges = new Map();

const rpName = process.env.WEBAUTHN_RP_NAME || 'Controle de Caixa';
const rpID = process.env.WEBAUTHN_RP_ID || 'localhost';
const origin = process.env.WEBAUTHN_ORIGIN || 'http://localhost:5173';

function salvarChallenge(chave, valor) {
  challenges.set(chave, valor);
  setTimeout(() => challenges.delete(chave), 5 * 60 * 1000);
}

async function gerarCadastroOptions(request, response) {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ ok: false, mensagem: 'Email obrigatorio' });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return response.status(404).json({ ok: false, mensagem: 'Usuario nao encontrado' });
    }

    const passkeys = await passkeyModel.buscarPorUsuarioId(usuario.id);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userName: usuario.email,
      userDisplayName: usuario.nome,
      userID: String(usuario.id),
      timeout: 60000,
      attestationType: 'none',
      excludeCredentials: passkeys.map((p) => ({
        id: p.credential_id,
        type: 'public-key'
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred'
      }
    });

    salvarChallenge(`reg_${usuario.id}`, options.challenge);

    return response.status(200).json({
      ok: true,
      dados: {
        usuario_id: usuario.id,
        options
      }
    });
  } catch (error) {
    return response.status(500).json({ ok: false, mensagem: 'Erro ao gerar cadastro passkey', erro: error.message });
  }
}

async function verificarCadastro(request, response) {
  try {
    const { usuario_id, cred } = request.body;

    if (!usuario_id || !cred) {
      return response.status(400).json({ ok: false, mensagem: 'usuario_id e cred sao obrigatorios' });
    }

    const expectedChallenge = challenges.get(`reg_${usuario_id}`);
    if (!expectedChallenge) {
      return response.status(400).json({ ok: false, mensagem: 'Challenge expirado' });
    }

    const verification = await verifyRegistrationResponse({
      response: cred,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false
    });

    const { verified, registrationInfo } = verification;
    if (!verified || !registrationInfo) {
      return response.status(400).json({ ok: false, mensagem: 'Nao foi possivel verificar cadastro passkey' });
    }

    const credential = registrationInfo.credential;

    await passkeyModel.criar({
      usuarioId: Number(usuario_id),
      credentialId: credential.id,
      publicKey: Buffer.from(credential.publicKey).toString('base64'),
      counter: credential.counter,
      deviceType: credential.deviceType,
      backedUp: credential.backedUp,
      transports: cred.response?.transports || []
    });

    challenges.delete(`reg_${usuario_id}`);

    return response.status(201).json({
      ok: true,
      mensagem: 'Passkey cadastrada com sucesso'
    });
  } catch (error) {
    return response.status(500).json({ ok: false, mensagem: 'Erro ao verificar cadastro passkey', erro: error.message });
  }
}

async function gerarLoginOptions(request, response) {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({ ok: false, mensagem: 'Email obrigatorio' });
    }

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return response.status(404).json({ ok: false, mensagem: 'Usuario nao encontrado' });
    }

    const passkeys = await passkeyModel.buscarPorUsuarioId(usuario.id);

    const options = await generateAuthenticationOptions({
      rpID,
      timeout: 60000,
      userVerification: 'preferred',
      allowCredentials: passkeys.map((p) => ({
        id: p.credential_id,
        type: 'public-key'
      }))
    });

    salvarChallenge(`auth_${usuario.id}`, options.challenge);

    return response.status(200).json({
      ok: true,
      dados: {
        usuario_id: usuario.id,
        options
      }
    });
  } catch (error) {
    return response.status(500).json({ ok: false, mensagem: 'Erro ao gerar login passkey', erro: error.message });
  }
}

async function verificarLogin(request, response) {
  try {
    const { usuario_id, cred } = request.body;

    if (!usuario_id || !cred) {
      return response.status(400).json({ ok: false, mensagem: 'usuario_id e cred sao obrigatorios' });
    }

    const expectedChallenge = challenges.get(`auth_${usuario_id}`);
    if (!expectedChallenge) {
      return response.status(400).json({ ok: false, mensagem: 'Challenge expirado' });
    }

    const passkey = await passkeyModel.buscarPorCredentialId(cred.id);
    if (!passkey) {
      return response.status(404).json({ ok: false, mensagem: 'Credencial nao encontrada' });
    }

    const verification = await verifyAuthenticationResponse({
      response: cred,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: passkey.credential_id,
        publicKey: Buffer.from(passkey.public_key, 'base64'),
        counter: Number(passkey.counter),
        transports: passkey.transports ? JSON.parse(passkey.transports) : undefined
      },
      requireUserVerification: false
    });

    if (!verification.verified) {
      return response.status(401).json({ ok: false, mensagem: 'Falha na autenticacao passkey' });
    }

    await passkeyModel.atualizarCounter(passkey.id, verification.authenticationInfo.newCounter);
    challenges.delete(`auth_${usuario_id}`);

    const usuario = await usuarioModel.buscarPorId(Number(usuario_id));
    if (!usuario || Number(usuario.ativo) !== 1) {
      return response.status(403).json({ ok: false, mensagem: 'Usuario inativo ou inexistente' });
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
      mensagem: 'Login com passkey realizado com sucesso',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  } catch (error) {
    return response.status(500).json({ ok: false, mensagem: 'Erro ao verificar login passkey', erro: error.message });
  }
}

module.exports = {
  gerarCadastroOptions,
  verificarCadastro,
  gerarLoginOptions,
  verificarLogin
};