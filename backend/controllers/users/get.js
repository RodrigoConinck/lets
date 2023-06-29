const Usuario = require('../../models/usuario')

module.exports = async(req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const user = await getUser(requestData)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: error.message});
    }
}

function extractData(request) {
    const { id } = request.query
    return { id }
}

async function analyseData(request) {
    const { id } = request
    if(!id) {
        throw new Error('id obrigatorio')
    }
}

async function getUser(request) {
    try {
        return await Usuario.findOne({
            where: {
                id: request.id
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}