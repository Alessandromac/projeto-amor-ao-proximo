const jwt = require('jsonwebtoken');

function autenticar(request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        ok: false,
        mensagem: 'Token nao enviado'
      });
    }

    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
      return response.status(401).json({
        ok: false,
        mensagem: 'Formato do token invalido. Use: Bearer SEU_TOKEN'
      });
    }

    const token = partes[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    request.usuario = {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
      perfil: payload.perfil
    };

    return next();
  } catch (error) {
    return response.status(401).json({
      ok: false,
      mensagem: 'Token invalido ou expirado'
    });
  }
}

module.exports = {
  autenticar
};
