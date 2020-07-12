const jwt = require("jwt-simple");

module.exports = async ({ req }) => {
  // await require("./mock")(req);

  const auth = req.headers.Authorization;
  const token = auth && auth.substr(7);

  const chaveAutorizacao = process.env.SERVER_AUTH_KEY;

  let usuario = null;
  let admin = false;

  if (token) {
    try {
      const infos = jwt.decode(token, chaveAutorizacao);

      if (new Date(infos.exp * 1000) > Date.now()) {
        usuario = infos;
      }
    } catch (err) {
      // TODO
    }
  }

  if (usuario && usuario.perfis) {
    admin = usuario.perfis.includes("admin");
  }

  const err = new Error("Acesso negado");

  return {
    usuario,
    admin,
    validarUsuario() {
      if (!usuario) {
        throw err;
      }
    },
    validarAdmin() {
      if (!admin) {
        throw err;
      }
    },
    validarUsuarioFiltro(filtro) {
      if (admin) {
        return;
      }

      if (!usuario || !filtro || !Object.keys(filtro).length) {
        throw err;
      }

      const { id, email } = filtro;

      if ((id && id !== usuario.id) || (email && email !== usuario.email)) {
        throw err;
      }
    },
  };
};
