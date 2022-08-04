const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const bcrypt = require('bcrypt');
const authModel = require('../Modul/auth');
const { generateToken, generateRefreshToken } = require('../helper/JsonWebToken');


const authControler = {
    register: async(req, res, next) =>{
        try {
            console.log('Register start');
            const {fullname, email, password} = req.body
            //check user by email
            const {rowCount} = await authModel.checkEmail(email)
            if (rowCount){
                res.status(401).json({
                    message: 'Email already taken'
                })
                console.log('Email already taken');
                console.log('Register end');
            }else{
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password,salt)
                const data = {
                user_id: uuidv4(),
                fullname,
                email,
                hash,
                status: true
                }
                console.log(data);
                await authModel.register(data)
                res.status(200).json({
                    message: 'Registration Success',
                    data
                })
                console.log('Registration Success');
                console.log('Register end');
            }
        
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    login: async(req, res, next)=>{
        try {
            console.log('login start');
            const {email, password} = req.body
        const {rowCount, rows: [data]} = await authModel.checkEmail(email)
        if(!rowCount) {
            console.log('unique email validation didnt pass');
            res.status(401).json({
                message: 'Email doesnt exist'
            })
            console.log('Email doesnt exist');
            console.log('login end');
        }else{
            const passValidate = bcrypt.compareSync(password, data.password)
            if(!passValidate){
                console.log('password validation didnt pass');
                res.status(403).json({
                    message: 'Email and password combination doesnt match'
                })
                console.log('Email and password combination doesnt match');
                console.log('login end');
            }else if(data.status === false){
                console.log('account activation didnt pass');
                res.status(403).json({
                    message: 'Please verify your email before continue'
                })
                console.log('Please verify your email before continue');
                console.log('login end');
            }else{
                console.log('pass every validation');
                const payload ={
                    user_id: data.user_id,
                    fullname: data.fullname,
                    email: data.email,
                }
                payload.token = generateToken(payload),
                payload.refreshToken = generateRefreshToken(payload)
                res.status(200).json({
                    message: `welcome back ${payload.fullname}`,
                    data: payload
                })
                console.log('Login Success');
                console.log('login end');
            }
        }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
        
    }
}

module.exports = authControler