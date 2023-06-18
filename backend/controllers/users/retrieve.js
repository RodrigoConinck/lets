const Usuario = require('../../models/usuario')

module.exports = async (req, res) => {
    try {
        const user = await retrieveUser()
        return res.send(user)
    } catch (error) {
        console.log(error)
        return res.send({message: error.message})
    }
}

async function retrieveUser() {
    try {
        return await Usuario.findAll()
    } catch (error) {
        console.log(error)
        throw new Error(error)   
    }
}