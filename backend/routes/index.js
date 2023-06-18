const users = require('./user')
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

module.exports = (app) => {
	app.use('/users', jsonParser, urlencodedParser, users)
}