const createError = require('http-errors')
const jwt = require('jsonwebtoken')

const verify = {
    isLogin: (req, res, next) => {
        try {
            console.log('start isLogin');
            if(req.headers.authorization){
                token = req.headers.authorization.split(' ')[1]
                req.payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
                console.log('isLoginEnd');
                next()
            }else{
                next(createError[401]('You need to login to access this feature'))
            }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    }
}
module.exports = verify