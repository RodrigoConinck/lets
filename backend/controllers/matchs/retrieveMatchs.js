const Matchs = require('../../models/matchs')
const Usuarios = require('../../models/usuario')
const { Op } = require('sequelize')
const moment = require('moment')

module.exports = async (req, res) => {
    try {
        const matchs = await retrieveMatch(req)
        return res.send(matchs)
    } catch (error) {
        console.log(error)
        return res.send({message: error.message})
    }
}

async function retrieveMatch(request) {
    try {
        const matchs = await Matchs.findAll({
            where: {
                [Op.or]: [
                    { fk_primeiro_usuario: request.infUser.id },
                    { fk_segundo_usuario: request.infUser.id }
                ],
            },
        });

        const matchsWithUsers = [];

        for(const match of matchs){
            const otherUserId = 
            match.fk_primeiro_usuario === request.infUser.id
            ? match.fk_segundo_usuario
            : match.fk_primeiro_usuario

            const otherUser = await Usuarios.findOne({where:{id:otherUserId}})

            const idade = calcularIdade(otherUser.data_nascimento)

            matchsWithUsers.push({
                match,
                otherUser,
                idade
            });
        }

        return matchsWithUsers
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