const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const user = { username, room, numberPlayers } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join queueRoom
socket.emit('joinRoom', user);

socket.on('message', (message) => {
  console.log(message);
});

socket.on('Match', (message) => {
  console.log(message);
});

