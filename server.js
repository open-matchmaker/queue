const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv').config({path : '.env'})

const PORT = process.env.PORT || 3000;

const queueLoad = require('./scr/utils/queue')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//mongodb connection
const test = require('./scr/services/Queue.Service');
test.showAll();

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", (userQueue) => {
    const resposneQueue = queueLoad.joinQueue(userQueue.room, userQueue.username, userQueue.numberPlayers)

    if(resposneQueue.message){
      io.emit("Match", resposneQueue);
    }

    socket.join(userQueue.room);

    socket.emit("message", "Bem viados!");
  });

});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
