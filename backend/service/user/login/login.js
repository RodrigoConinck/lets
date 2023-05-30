const jwt = require('jsonwebtoken')

const Usuario = require('../../../models/usuario')
const login = async (email, senha) =>{
    try {
        const usuario = await Usuario.findOne({email,senha }, {
            raw:true,
            where:{
                email: email,
                senha: senha
            }
        });
        console.log(usuario)
        const token = jwt.sign(usuario.toJSON(), process.env.SEGREDOJWT);
        //const token = jwt.sign(usuario, process.env.SEGREDOJWT)
        console.log(token)
        return token
    } catch (error) {
        console.log(error)
        //throw new Error(error)
    }
};

module.exports = login