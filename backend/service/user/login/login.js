const jwt = require('jsonwebtoken')

const Usuario = require('../../../models/usuario')
const login = async (email, senha) =>{
    try {
        const usuario = await Usuario.findOne({
            raw:true,
            where:{
                email: email,
                senha: senha
            }
        });
        let token = null
        if(usuario){
            token = jwt.sign(usuario, process.env.SEGREDOJWT);
        }
        return token
    } catch (error) {
        console.log(error)
    }
};

module.exports = login