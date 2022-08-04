const createHttpError = require("http-errors");
const userModel = require("../Modul/user")
const  cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })


const userControler = {
    getUser: async(req,res,next) => {
        try {
            console.log('start Get User');
            const idUser = req.payload.user_id
        const resultUser = await userModel.getUser(idUser)
        console.log('get item from databased success');
        res.status(200).json({
            message: 'success',
            data: resultUser.rows
        })   
        } catch (error) {
            console.log(error);
            next(createHttpError[500])
        }
    },
    getProfile: async(req, res, next) => {
        try {
            console.log('Start Get Profile');
            console.log(req.payload)
            const idUser = req.payload.user_id
            const {rows: resultUser} = await userModel.getProfile(idUser)
            delete resultUser.user_id
            delete resultUser.password
            res.status(200).json({
                message: 'success',
                data: resultUser
            })
        } catch (error) {
            console.log(error);
            next(createHttpError[500])
        }
    },
    updateProfile: async(req, res, next) => {
        try {
            console.log('masuk update profile')
            const idUser = req.payload.user_id
            const {rows: resultUser} = await userModel.getProfile(idUser)
            const fullname = req.body.fullname
            const username = req.body.username
            const description = req.body.description
            if(req.file){
                const file = req.file
                const ava = await cloudinary.uploader.upload(file.path)
                const datas = {
                fullname: fullname || resultUser.fullname, 
                username: username || resultUser.username,
                description: description || resultUser.description,
                user_id: idUser || resultUser.user_id,
                avatar: ava.secure_url || resultUser.avatar
            }
            await userModel.updateProfileWithAva(datas)
            res.status(200).json({
                message: 'success'
            })
            }else{
                const datas = {
                    fullname: fullname || resultUser.fullname, 
                    username: username || resultUser.username,
                    description: description || resultUser.description,
                    user_id: idUser || resultUser.user_id
                }
                await userModel.updateProfile(datas)
                res.status(200).json({
                    message: 'success'
                })
            }
            
        } catch (error) {
            console.log(error)
            next(createHttpError[500])
        }
    }
}

module.exports = userControler