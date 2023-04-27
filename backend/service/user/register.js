const Usuario = require('../../models/usuario')
const register = async (nome, email, senha) =>{
    try {
        const usuario = await Usuario.create({ nome, email,senha });
        return usuario
    } catch (error) {
        console.log(error)
        //throw new Error(error)
    }
};

module.exports = register