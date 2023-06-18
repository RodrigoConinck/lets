const Usuario = require('../../models/usuario')

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const user = await destroyUser(requestData)
        return res.send({rows: user})
    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
}


function extractData(request) {
    const { id } = request.query
    return { id }
}

async function analyseData(request) {
    const { id } = request
    if(!id) {
        throw new Error('id do usuario é obrigatorio!')
    }
}

async function destroyUser(request) {
    try {
        return await Usuario.destroy({
            where: {
                id: request.id
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}