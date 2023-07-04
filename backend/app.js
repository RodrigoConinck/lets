const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
require('dotenv').config()

let corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('./routes/index')(app)
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
