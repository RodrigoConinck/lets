const create_like = require("../controllers/likes/create")
const auth = require('../middlewares/auth')

const express = require('express')

const router = express.Router();

router.post("/create", auth, create_like)

module.exports = router