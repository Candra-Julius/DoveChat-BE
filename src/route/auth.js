const express =require('express')
const router = express.Router()
const { register, login } = require('../controler/auth')
const { upload } = require('../middleware/formHandler')


router
.post('/register', upload.none(), register)
.post('/login', upload.none(), login)

module.exports = router