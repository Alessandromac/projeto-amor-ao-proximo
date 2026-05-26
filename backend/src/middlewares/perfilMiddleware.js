function permitirPerfis(...perfisPermitidos) {
  return (request, response, next) => {
    const perfilUsuario = request.usuario?.perfil;

    if (!perfilUsuario) {
      return response.status(401).json({
        ok: false,
        mensagem: 'Usuario nao autenticado'
      });
    }

    if (!perfisPermitidos.includes(perfilUsuario)) {
      return response.status(403).json({
        ok: false,
        mensagem: 'Acesso negado para este perfil'
      });
    }

    return next();
  };
}

module.exports = {
  permitirPerfis
};
