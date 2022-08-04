const jwt =require('jsonwebtoken')

const jsonWebToken ={
    generateToken:(payload)=>{
        const expiresIn={
            expiresIn: '6h'
        }
        const token =jwt.sign(payload, process.env.JWT_SECRET_KEY, expiresIn)
        return token
    },
    generateRefreshToken:(payload)=>{
        const expiresIn={
            expiresIn: '24h'
        }
        const refreshToken =jwt.sign(payload, process.env.JWT_SECRET_KEY, expiresIn)
        return refreshToken
    },
    
}

module.exports = jsonWebToken