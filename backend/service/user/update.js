const Usuario = require('../../models/usuario')
const update = async (nome, idade, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, foto_perfil) =>{
    try {
        const usuario = await Usuario.update({ nome, idade, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, foto_perfil }, {
        });
        return usuario
    } catch (error) {
        console.log(error)
        //throw new Error(error)
    }
};

module.exports = update