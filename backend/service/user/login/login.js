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
        console.log(usuario)
        let token = null
        if(usuario){
            token = jwt.sign(usuario, process.env.SEGREDOJWT);
        }
        //const token = jwt.sign(usuario, process.env.SEGREDOJWT)
        console.log(token)
        return token
    } catch (error) {
        console.log(error)
        //throw new Error(error)
    }
};

module.exports = login