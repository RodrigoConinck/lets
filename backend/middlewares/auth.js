const jwt = require('jsonwebtoken')

module.exports =  (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token) {
            res.send('Token Obrigatorio')
        } else {
            const infUser = extractDataToken(token)
            req.infUser = infUser
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: error.message});
    }
}


function extractDataToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SEGREDOJWT)
        return decoded
    } catch (error) {
        throw new Error(`${error}`)
    }
  }