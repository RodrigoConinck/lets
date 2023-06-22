const Usuario = require('../../models/usuario')
const jwt = require('jsonwebtoken')

module.exports = async(req, res) => {
    try {
        const user = await getUser(req)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.send({message: error.message})
    }
}

async function getUser(req) {
    try {
        const token = req.headers.token
        let id = jwt.verify(token, process.env.SEGREDOJWT).id
        return await Usuario.findOne({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}