const jwt = require("jwt-simple");
const { perfis: getPerfis } = require("../Type/Usuario");

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await getPerfis(usuario);

    // O tempo é divido por mil pois o JWT requer a quantidade de segundos
    const tempoPresente = Math.floor(Date.now() / 1000);

    const payload = {
      ...usuario,
      perfis: perfis.map((perfil) => perfil.nome),
      iat: tempoPresente,
      exp: tempoPresente + 2 * 24 * 60 * 60,
    };

    const chaveAutorizacao = process.env.SERVER_AUTH_KEY;

    return {
      ...payload,
      token: jwt.encode(payload, chaveAutorizacao),
    };
  },
};
