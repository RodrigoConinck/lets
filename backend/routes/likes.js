const create_like = require("../controllers/likes/create")
const auth = require('../middlewares/auth')

const express = require('express')

var router = express.Router();

router.post("/create", auth, create_like)

module.exports = router