const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv').config({path : '.env'})

const PORT = process.env.PORT || 3000;

const queueLoad = require('./scr/utils/queue')

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  cors: {
    origin: process.env.APPURL
  }
});

const queueServices = require('./scr/services/Queue.Service')

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/queue', require('./scr/router/queue'));


// Run when client connects
io.on("connection", (socket)  => {
  socket.on("joinRoom", async (userQueue) => {
    const resposneQueue = await queueServices.joinQueue(userQueue.room, Number(userQueue.numberPlayers) ,userQueue.username)

    const room = userQueue.room + userQueue.numberPlayers

    if(resposneQueue.message === 'Its a Match!'){
      io.emit(room, resposneQueue);
    }

    socket.join(room);

    socket.emit("message", "Bem vindos!");
  });

  socket.on("quitQueue", async (userDisconect) => {

    const user = await queueServices.disconnectQueue(userDisconect.room, Number(userDisconect.numberPlayers) ,userDisconect.username);


    socket.disconnect()

  });

  socket.on("disconnect", (motivo) => {
    console.log(motivo)
  })


});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
