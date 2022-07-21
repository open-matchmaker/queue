class Games{
  constructor(name, necessaryPlayers){
    this.name = name,
    this.players = [],
    this.necessaryPlayers = necessaryPlayers
  }
}

const queueGames = [];



// Join user to chat
function joinQueue(name, player, necessaryPlayers) {
  const user = { name, player, necessaryPlayers };
  const queueGame = findGameInQueue(name, necessaryPlayers)
  if(queueGame === undefined){
    const userQueue = new Games(name, necessaryPlayers)
    userQueue.players.push(player)
  }
  
  if(queueGame){
    addPlayersQueueGame(queueGame, player)
    console.log(itsMatch(queueGame));
  }
  return user;
}


function findGameInQueue(name, players){
  return queueGames.find(queueGame => (queueGame.name === name && queueGame.necessaryPlayers === players))
}

function addPlayersQueueGame(queueGame, player){
  queueGame.players.push(player);
}

function itsMatch(queueGame){
  if((queueGame.players.length) === queueGame.necessaryPlayers){
    userLeave(queueGame.name, queueGame.necessaryPlayers)
    return ({message:'ITS MATCH!', players: queueGame.players})
  }
  else{
    return 'not a match...';
  }
}


// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(name, players) {
  const index = queueGames.findIndex(queueGame => (queueGame.name === name && queueGame.necessaryPlayers === players));

  if (index !== -1) {
    return queueGames.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}
module.exports = {
  joinQueue,
  findGameInQueue,
  itsMatch,
  userLeave,
  getCurrentUser
};