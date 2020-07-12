const db = require("./db");
const { getUsuarioLogado } = require("../resolvers/Commom/user");

const sql = `
  select
    u.*
  from
    usuarios as u,
    usuarios_perfis as up,
    perfis as p
  where
    u.id = up.usuario_id and
    up.perfil_id = p.id and
    u.ativo = 1 and
    p.nome = :perfil
  limit 1
`;

async function getUsario(perfil) {
  const res = await db.raw(sql, { perfil });

  return res ? res[0][0] : null;
}

module.exports = async (req) => {
  const usuario = await getUsario("comum");

  if (usuario) {
    const { token } = await getUsuarioLogado(usuario);

    req.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
};
