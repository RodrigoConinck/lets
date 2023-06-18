const Usuario = require('../../models/usuario')
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    try {
        const requestData = await extractData(req)
        await analyseData(requestData)
        const newUser = await createNewUser(requestData)
        return res.send(newUser)
    } catch (error) {
        console.log(error)
        res.status(404)
        res.send({message: error.message})
    }
}

async function extractData(request) {
    const { nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, data_nascimento, foto_perfil, whatsapp } = request.body
    let { senha } = request.body
    const salt = await bcrypt.genSalt(10);
    senha = await bcrypt.hash(senha, salt);
    return { nome, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, email, senha, data_nascimento, foto_perfil, whatsapp }
}

async function analyseData(request) {
    const { nome, email, senha } = request
    if(!nome || !email || !senha) {
        throw new Error('Campos obrigatórios')
    }
}

async function createNewUser(request) {
    try {
        const user = await Usuario.create(request)
        return user
    } catch (error) {
        throw new Error(error)
    }
}