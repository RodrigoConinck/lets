const retrieve_match = require("../controllers/matchs/retrieveMatchs")
const auth = require('../middlewares/auth')

const express = require('express')

var router = express.Router();

router.get("/retrieve", auth, retrieve_match)

module.exports = router