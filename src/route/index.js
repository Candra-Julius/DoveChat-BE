const express =require('express')
const router = express.Router()
const auth = require('./auth')
const chat = require('./chat')
const user = require('./user')

router
.use('/', auth)
.use('/chat', chat)
.use('/user', user)

module.exports = router