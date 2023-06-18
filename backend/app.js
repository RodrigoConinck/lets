var express = require('express');
var app = express();
var cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./routes/index')(app)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
