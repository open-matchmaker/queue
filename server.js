const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
require("dotenv").config();
const { createClient } = redis;
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const queueLoad = require('./utils/queue')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

/* (async () => {
  pubClient = createClient({ url: "redis://127.0.0.1:6379" });
  await pubClient.connect();
  subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
})(); */

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
