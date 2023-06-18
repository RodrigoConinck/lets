var express = require('express');
var app = express();
var cors = require('cors')
const registrar = require('./service/user/register')
const update = require('./service/user/update')
const login = require('./service/user/login/login')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./routes/index')(app)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/register', async function (req, res) {
  const {nome, email, senha} = req.body;
  console.log(nome,email,senha);
  const newRegister = await registrar(nome, email, senha)
  res.send(newRegister)
});

app.post('/login', async function(req, res){
  const {email, password} = req.body;
  const token = await login(email, password)
  res.send({token:token})
})

app.post('/perfil', async function (req, res) {
  const {nome, idade, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, foto_perfil} = req.body;
  console.log(nome, idade, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, foto_perfil);
  const newRegister = await update(nome, idade, sexo, altura, peso, estado, cidade, bairro, atividades_preferenciais, frequencia, ativo_fisicamente, foto_perfil)
  res.send(newRegister)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
