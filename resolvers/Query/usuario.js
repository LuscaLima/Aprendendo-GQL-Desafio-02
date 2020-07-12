const db = require("../../config/db");
const bcrypt = require("bcrypt-nodejs");
const { getUsuarioLogado } = require("../Commom/user");

module.exports = {
  async login(_, { dados }) {
    const usuario = await db("usuarios").where({ email: dados.email }).first();

    if (!usuario) {
      throw new Error("Usuário ou senha inválido");
    }

    const iguais = bcrypt.compareSync(dados.senha, usuario.senha);

    if (!iguais) {
      throw new Error("Usuário ou senha inválido");
    }

    return getUsuarioLogado(usuario);
  },

  async usuarios(_, __, context) {
    context && context.validarAdmin();

    return await db("usuarios");
  },

  async usuario(_, { filtro }, context) {
    context && context.validarUsuarioFiltro(filtro);

    if (!filtro) {
      return null;
    }

    const { id, email } = filtro;

    if (id) {
      return db("usuarios").where({ id }).first();
    } else if (email) {
      return db("usuarios").where({ email }).first();
    } else {
      return null;
    }
  },
};
