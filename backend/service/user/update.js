const Usuario = require('../../models/usuario')
const update = async ({
    nome,
    idade,
    sexo,
    altura,
    peso,
    estado,
    cidade,
    bairro,
    atividades_preferenciais,
    frequencia,
    ativo_fisicamente,
    foto_perfil
  }) => {
    try {
      const person = {
        nome,
        idade,
        sexo,
        altura,
        peso,
        estado,
        cidade,
        bairro,
        atividades_preferenciais,
        frequencia,
        ativo_fisicamente,
        foto_perfil
      };
      const usuario = await Usuario.update(person, {});
      return usuario;
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = update;
  