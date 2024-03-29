const leaveBtn = document.getElementById('leave-btn')
// Get username and room from URL
const user = { username, room, numberPlayers } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const newRoom = room+numberPlayers

const socket = io();

// Join queueRoom
socket.emit('joinRoom', user);

socket.on('message', (message) => {
  console.log(message);
});

socket.on(newRoom, (message) => {
  console.log(message);
});

leaveBtn.addEventListener('click', () => { 
  socket.emit('quitQueue', user)
  alert('user disconected')
})
//setTimeout(() => socket.emit('quitQueue', user), 5000)