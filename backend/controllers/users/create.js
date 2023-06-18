const Usuario = require('../../models/usuario')

module.exports = async(req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const newUser = await createNewUser(requestData)
        return res.send(newUser)
    } catch (error) {
        res.send(error)
    }
}

function extractData(request) {
    const { nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, senha, data_nascimento, foto_perfil } = request.body
    return { nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, senha, data_nascimento, foto_perfil }
}

async function analyseData(request) {
    const { nome, email, senha } = request
    if(!nome || !email || !senha) {
        throw new Error('Campos obrigatórios')
    }
}

async function createNewUser(request) {
    try {
        return await Usuario.create(request)
    } catch (error) {
        throw new Error(error)
    }
}