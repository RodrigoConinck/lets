const users = require('./user')
const likes = require('./likes')
const matchs = require('./matchs')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: true })

module.exports = (app) => {
	app.use('/users', jsonParser, urlencodedParser, users)
	app.use('/likes', jsonParser, urlencodedParser, likes)
	app.use('/matchs', jsonParser, urlencodedParser, matchs)
}