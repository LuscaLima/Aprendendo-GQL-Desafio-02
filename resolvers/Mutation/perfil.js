const db = require("../../config/db");
const { perfil: getPerfil } = require("../Query/perfil");

module.exports = {
  async novoPerfil(_, { dados }, context) {
    context && context.validarAdmin();

    try {
      const [id] = await db("perfis").insert(dados);
      return await db("perfis").where({ id }).first();
    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  },

  async excluirPerfil(_, { filtro }, context) {
    context && context.validarAdmin();

    try {
      const perfil = await getPerfil(_, { filtro });

      if (perfil) {
        await db("perfis").delete().where({ id: perfil.id });
      }

      return perfil;
    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  },

  async alterarPerfil(_, { filtro, dados }, context) {
    context && context.validarAdmin();

    try {
      const perfil = await getPerfil(_, { filtro });

      if (perfil) {
        await db("perfis").update(dados).where({ id: perfil.id });
      }

      return { ...perfil, ...dados };
    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  },
};
