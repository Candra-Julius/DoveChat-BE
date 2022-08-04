const express =require('express')
const router = express.Router()
const userControler = require('../controler/user')
const { upload } = require('../middleware/formHandler')
const { isLogin } = require('../middleware/verify')


router
.get('/', isLogin, userControler.getUser)
.get('/profile', isLogin, userControler.getProfile)
.put('/update', isLogin, upload.single('avatar'), userControler.updateProfile)

module.exports = router