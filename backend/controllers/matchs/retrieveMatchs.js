const Matchs = require('../../models/matchs')
const { Op } = require('sequelize')

module.exports = async (req, res) => {
    try {
        const user = await retrieveMatch(req)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

async function retrieveMatch(request) {
    try {
        return await Matchs.findAll({
            where: {
                [Op.or]: [{ fk_primeiro_usuario: request.infUser.id }, { fk_segundo_usuario: request.infUser.id }],
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}