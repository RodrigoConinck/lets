const create_user = require("../controllers/users/create")
const retrieve_user = require("../controllers/users/retrieve")
const update_user = require("../controllers/users/update")
const delete_user = require("../controllers/users/delete")
const getUser = require('../controllers/users/get')
const login = require("../controllers/users/login")

const express = require('express')

var router = express.Router();

router.post("/", create_user)
router.get('/getUser', getUser)
router.get("/", retrieve_user)
router.put("/", update_user)
router.delete("/", delete_user)
router.post("/", login)

module.exports = router