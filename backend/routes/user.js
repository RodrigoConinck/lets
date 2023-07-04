const create_user = require("../controllers/users/create")
const retrieve_user = require("../controllers/users/retrieve")
const update_user = require("../controllers/users/update")
const upload = require("../controllers/users/upload")
const delete_user = require("../controllers/users/delete")
const getUser = require('../controllers/users/get')
const login = require("../controllers/users/login")
const getUserWithToken = require("../controllers/users/getUserWithToken")
const getNearPersons = require('../controllers/users/getNearPersons')
const auth = require('../middlewares/auth')
const multer = require('multer')
const uploadContent = multer({dest: 'uploads/'})

const express = require('express')

const router = express.Router();

router.post("/create", create_user)
router.get('/getUser', auth, getUser)
router.get("/retrieve", auth, retrieve_user)
router.put("/update", auth, update_user)
router.post("/upload", auth, uploadContent.single('image'), upload)
router.delete("/delete", auth, delete_user)
router.get("/getUserToken", auth, getUserWithToken)
router.get("/getNearPersons", auth, getNearPersons)
router.post("/login", login)

module.exports = router