const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app)

const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));


io.on('connection',(socket) => {
    console.log("New webSocket connection");

    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','A new user has joined!')
    socket.on('sendmsg',(msg,callback) => {
        console.log(msg)
        io.emit('message',msg)
        callback('Delivered!');
    });

    socket.on('sendLocation',(coords) => {
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect',() => {
        io.emit('message','A user has left!');
    })
})


server.listen(3000,() => {
    console.log("server listn at 3000")
})