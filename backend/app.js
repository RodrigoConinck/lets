var express = require('express');
var app = express();
const registrar = require('./service/register')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/login', async function (req, res) {
  const {nome, email, senha} = req.body;
  console.log(nome,email,senha);
  const newRegister = await registrar(nome, email, senha)
  res.send(newRegister)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
