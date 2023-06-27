const Likes = require('../../models/likes')
const Matchs = require('../../models/matchs')
const { Op } = require('sequelize')
module.exports = async(req, res) => {
    try {
        const requestData = await extractData(req)
        await analyseData(requestData)
        const newLike = await createNewLike(req)
        const isMatch = await verifyMatch(newLike)
        return res.send(newLike)
    } catch (error) {
        res.send({message: error.message})
    }
}

async function extractData(request) {
    const { curtidor, curtido } = request.body
    return { fk_curtidor: curtidor, fk_curtido: curtido }
}

async function analyseData(request) {
    const { fk_curtido } = request
    if(!fk_curtido) {
        throw new Error('Campos obrigatórios')
    }
}

async function createNewLike(request) {
    try {
        let like =  await Likes.create({
            fk_curtidor: request.infUser.id,
            fk_curtido: request.body.curtido
        })
        like = like.dataValues
        return like

    } catch (error) {
        throw new Error(error)
    }
}

async function verifyMatch(newLike){
    try {
        const isMatch = await Likes.findOne({
            raw: true,
            where: {
                [Op.and]: [{ fk_curtidor: newLike.fk_curtido }, { fk_curtido: newLike.fk_curtidor }],
            }
        })
        let match = null
        console.log(isMatch)
        if(isMatch){
           await Matchs.create({
                fk_primeiro_usuario: isMatch.fk_curtidor,
                fk_segundo_usuario: isMatch.fk_curtido
            }).then(() => {
                console.log("Match criado")
            }).catch((error) => {
                console.log(error)
            }) 
        }
    } catch (error) {
        throw new Error(error)
    }
}