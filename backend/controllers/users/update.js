const Usuario = require('../../models/usuario')

module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const user = await updateUser(requestData)
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
}

function extractData(request) {
    const { id } = request.query
    const { nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, senha, data_nascimento, foto_perfil, whatsapp } = request.body
    return { id, nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, senha, data_nascimento, foto_perfil, whatsapp }
}

async function analyseData(request) {
    const { id } = request
    if(!id) {
        throw new Error('id obrigatorio')
    } 
}

async function updateUser(request) {
    try {
        const idUser= request.id
        delete request.id
        return await Usuario.update(request, {
            where: {
                id: idUser
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}