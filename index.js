const express = require('express')
const {Server} = require('socket.io')
const { v4: uuidv4 } = require('uuid')
const createError = require("http-errors")
const main = require('./src/route/index')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const moment = require('moment')
moment.locale('id')


const app = express()
const http = require('http')
const { disconnect } = require('process')
const { log } = require('console')
const chatModule = require('./src/Modul/chat')
const httpServer = http.createServer(app)
const PORT = 8080
const io = new Server(httpServer, {
    cors: {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 204,
        credentials: true,
        origin: 'http://localhost:3000'
    }
})
app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: true,
      optionsSuccessStatus: 204,
    })
  );

  io.use((socket, next)=> {
    console.log('midleware');
    const token = socket.handshake.query.token
    console.log('decode');
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      // if(error){
      //   console.log(error);
      // }
      // console.log(decoded);
      socket.userid = decoded.user_id
      socket.join(decoded.user_id)
      console.log('decode sucess');
      next()
    // })
  })
//route
app.use('/', main)

//error handling
app.all("*", (req, res, next) => {
    next(new createError[404]());
  });
  
  app.use((err, req, res, next) => {
    const messError = err.message;
    const statusError = err.status;
  
    res.status(statusError).json({
      message: messError,
    });
  });

io.on('connection',(socket)=>{
    console.log(`${socket.id} as ${socket.userid} conected`);
    
    socket.on('message', (data, callback)=>{
      const detail = {
        id: uuidv4(),
        sender: socket.userid,
        reciver: data.idReciver,
        message: data.messageBody,
        date: data.date
      }
      callback({...detail, date: moment(detail.date).format('LT')})
      console.log(detail);
      chatModule.insertChat(detail)
      .then(()=>{
        socket.broadcast.to(data.idReciver).emit('message', {message: detail.message, date: detail.date})
      })
        // socket.emit('message', {message: data.messageBody, date: new Date()})
    })

    socket.on('disconnect',()=>{
        console.log(`${socket.id}disconnected`);
    })
})

httpServer.listen(PORT, ()=>{
    console.log(`Port ${PORT} is runing`);
})