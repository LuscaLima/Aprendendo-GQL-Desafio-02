const bcrypt = require("bcrypt-nodejs");
const db = require("../../config/db");
const { perfil: getPerfil } = require("../Query/perfil");
const { usuario: getUsuario } = require("../Query/usuario");

const Mutations = {
  cadastrarUsuario(_, { dados }) {
    return Mutations.novoUsuario(_, { dados });
  },

  async novoUsuario(_, { dados }, context) {
    context && context.validarAdmin();

    try {
      const idPerfis = [];

      if (!dados.perfis || !dados.perfis.length) {
        dados.perfis = [
          {
            nome: "comum",
          },
        ];
      }

      for (const perfil of dados.perfis) {
        const p = await getPerfil(_, { filtro: { ...perfil } });

        if (p) {
          idPerfis.push(p.id);
        }
      }

      // Criptografando a senha
      const salt = bcrypt.genSaltSync();
      dados.senha = bcrypt.hashSync(dados.senha, salt);

      delete dados.perfis;
      const [usuario_id] = await db("usuarios").insert(dados);

      for (const perfil_id of idPerfis) {
        await db("usuarios_perfis").insert({
          usuario_id,
          perfil_id,
        });
      }

      return await db("usuarios").where({ id: usuario_id }).first();
    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  },

  async excluirUsuario(_, { filtro }, context) {
    context && context.validarAdmin();

    try {
      const usuario = await getUsuario(_, { filtro });

      if (usuario) {
        await db("usuarios_perfis").delete().where({ usuario_id: usuario.id });
        await db("usuarios").delete().where({ id: usuario.id });
      }

      return usuario;
    } catch (err) {
      throw new Error(err.sqlMessage);
    }
  },

  async alterarUsuario(_, { filtro, dados }, context) {
    context && context.validarUsuarioFiltro(filtro);

    try {
      const usuario = await getUsuario(_, { filtro });

      if (usuario) {
        if (context.admin && dados.perfis) {
          await db("usuarios_perfis")
            .delete()
            .where({ usuario_id: usuario.id });

          for (const perfil of dados.perfis) {
            const p = await getPerfil(_, { filtro: perfil });

            p &&
              (await db("usuarios_perfis").insert({
                usuario_id: usuario.id,
                perfil_id: p.id,
              }));
          }

          delete dados.perfis;
        }

        if (dados.senha) {
          // Criptografando no momento da edição
          const salt = bcrypt.genSaltSync();
          dados.senha = bcrypt.hashSync(dados.senha, salt);
        }

        await db("usuarios").update(dados).where({ id: usuario.id });
        return { ...usuario, ...dados };
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = Mutations;
