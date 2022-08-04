const express =require('express')
const { getReciverProfile, getProfile, getChat } = require('../controler/chat')
const { isLogin } = require('../middleware/verify')
const router = express.Router()

router
.get('/getReciver/:id', getReciverProfile)
.get('/user', getProfile)
.get('/getchat/:id', isLogin, getChat)

module.exports = router