const Usuario = require('../../models/usuario')

module.exports = async (req, res) => {
  try {
    const dataRequest = extractData(req);
    await validationLogin(dataRequest);
    const token = await findUser(dataRequest);
    if (!token) {
      res.send("Usuário não encontrado");
    }
    res.send(token);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

function extractData(request) {
  const { email, password } = request.body;
  return { email, password };
}

async function validationLogin(dataRequest) {
  if (!dataRequest.login || !dataRequest.password) {
    throw new Error("Login ou Senha inválida");
  }
}

async function findUser(dataRequest) {
  try {
    let user = await Usuario.findOne({
      raw: true,
      where: {
        email: dataRequest.email,
        password: dataRequest.password,
      },
    });
    let token = null
    if (user){
      token = jwt.sign(user, process.env.KEYJWT)
    }
    console.log(token)
    return token
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
