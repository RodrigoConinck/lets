const Usuario = require('../../models/usuario')
const Likes = require('../../models/likes')
const { Op } = require('sequelize')
const moment = require('moment')

module.exports = async (req, res) => {
    try {
        const user = await retrieveUser(req)
        const usuarioComIdade = user.map(user =>{
            const idade = calcularIdade(user.data_nascimento)
            return { ...user.toJSON(), idade}
        })
        return res.send(usuarioComIdade)
    } catch (error) {
        console.log(error)
        return res.send({message: error.message})
    }
}

async function retrieveUser(req) {
    try {
        const likes = await Likes.findAll({
            where: {
                fk_curtidor: req.infUser.id
            }
        });
        const likedUserIds = likes.map(like => like.fk_curtido);

        const usuarios = await Usuario.findAll({
            where: {
                id: {
                    [Op.not]: req.infUser.id,
                    [Op.notIn]: likedUserIds
                },
                cidade: req.infUser.cidade
            }
        });

        return usuarios;
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}


function calcularIdade(data_de_nascimento){
    const now = moment()
    const dataDeNascimento = moment(data_de_nascimento)
    const difAnos = now.diff(dataDeNascimento, 'years')
    return difAnos
}