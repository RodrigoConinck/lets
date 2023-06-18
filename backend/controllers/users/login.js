const Usuario = require('../../models/usuario')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  try {
    const dataRequest = extractData(req);
    await validationLogin(dataRequest);
    const token = await findUser(dataRequest);
    res.send(token);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

function extractData(request) {
  const { email, senha } = request.body;
  return { email, senha };
}

async function validationLogin(dataRequest) {
  if (!dataRequest.email || !dataRequest.senha) {
    throw new Error("Login ou Senha inválida");
  }
}

async function findUser(dataRequest) {
  try {
    let user = await Usuario.findOne({
      raw: true,
      where: {
        email: dataRequest.email
      }
    });

    let token = null
    if (user) {
      const isMatch = await bcrypt.compare(dataRequest.senha, user.senha)
      if (isMatch) {
        token = jwt.sign(user, process.env.SEGREDOJWT)
      } else {
        throw new Error('Senha Invalida')
      }
    } else {
      throw new Error('Usuario não existe')
    }
    return token
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
