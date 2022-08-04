const { getReciverProfile, getChat } = require("../Modul/chat")
const createError = require('http-errors')
const { checkEmail } = require("../Modul/auth")
const moment = require('moment')
moment.locale('id')

const chat = {
    getProfile: async(req, res, next) => {
        try {
            const email = req.payload.email
            const {rows:[data]} = await checkEmail(email)
            delete data.password
            res.status(200).json({
                message: 'success',
                data 
            })
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    getReciverProfile: async(req, res, next) => {
        try {
            const {id} = req.params
        const {rowCount, rows: data} = await getReciverProfile(id)
        if(!rowCount){
            res.status(401).json({
                message: 'account doesnt exist'
            })
        }else{
            res.status(200).json({
                message: 'succsess',
                data
            })
        }
        } catch (error) {
            console.log(error);
            next(createError[500]())
        }
    },
    getChat: async(req, res, next) => {
        const reciver = req.params.id
        const sender = req.payload.user_id
        const {rows} = await getChat(sender, reciver)
        const data = rows.map((item)=>{
            const datas ={
                chatid: item.chatid,
                date: moment(item.date).format('LT'),
                message: item.message,
                reciver: item.reciver,
                sender: item.sender
            }
            return datas
        })
        res.status(200).json({
            message: 'Success',
            data
        })
    },
    deleteChat: async(req, res, next) => {
        try {
            
        } catch (error) {
            console.log(error);
            next(createError[500])
        }
    }
}

module.exports = chat