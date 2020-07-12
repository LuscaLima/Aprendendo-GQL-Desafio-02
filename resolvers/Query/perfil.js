const db = require("../../config/db");

module.exports = {
  async perfis(_, __, context) {
    context && context.validarAdmin();

    const res = await db("perfis").select();

    return res;
  },

  async perfil(_, { filtro }, context) {
    context && context.validarAdmin();

    const { id, nome } = filtro;

    let res = null;

    if (id) {
      res = await db("perfis").select().where({ id }).first();
    } else if (nome) {
      res = await db("perfis").select().where({ nome }).first();
    }

    return res;
  },
};
