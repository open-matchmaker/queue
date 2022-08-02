const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const tests = {
  data: {
    gameName : 'CSGO',
    spec: {
      create: [{
        necessaryPlayers: 2,
        queuePlayer: [{playerName: 'Ze'},{playerName: 'Arthur'}]
      },{
        necessaryPlayers: 4,
        queuePlayer: [{playerName: 'Gotinha'},{playerName: 'Arthur'}]
      }],
    }
  }
}

exports.joinQueue = async (gameName, necessaryPlayers, playerName) => {
  const gameInQueue = await this.getByGameName(gameName);
  
  //console.log(await this.getByNecessaryPlayers(gameInQueue.id, necessaryPlayers));
  if(!gameInQueue){
    await this.createGame(gameName, necessaryPlayers, playerName)
  }
  if(gameInQueue){
    const playersQueue = await this.getByNecessaryPlayers(gameInQueue.id, necessaryPlayers)
    if(!playersQueue){
      await this.createQueue(gameInQueue.id, necessaryPlayers, playerName)
    }
    //console.log(playersQueue);
    console.log(await this.updateQueue(playersQueue, playerName));
  }
}

exports.updateQueue = async (playersQueue, playerName) => {
  let newData = playersQueue
  newData.queuePlayer.push({playerName: playerName})
  const updatedGame = await prisma.specs.update({
    where: {
      id: playersQueue.id
    },
    data: {
      queuePlayer: newData.queuePlayer
    }
  });
  return updatedGame;
}

exports.showAllQueues = async () => {
  const allQueue = await prisma.game.findMany({
    include: {
      spec: true,
    },
  })
  return allQueue;
}

exports.createQueue = async (gameId, necessaryPlayers, playerName) => {
  console.log(playerName);
  const newQueue = await prisma.specs.create({
    data: {
      specsId: gameId,
      necessaryPlayers,
      queuePlayer: [{playerName}]
    }
  })

}

exports.createGame = async (gameName, necessaryPlayers, playerName) => {
  const created = await prisma.game.create({
    data: {
      gameName,
      spec: {
        create: [{
          necessaryPlayers,
          queuePlayer: [{playerName}]
        }],
      }
    }
  });

  return created;
}

exports.getByGameName = async (gameName) => {
  const gameInQueue = await prisma.game.findUnique({
    where: {
      gameName: gameName
    },
  });
  return gameInQueue;
}

exports.getByNece = async (gameName, necessaryPlayers) => {
  console.log(necessaryPlayers);
  const gameInQueue = this.getByNecessaryPlayers(gameName, necessaryPlayers)
  return gameInQueue;

}

exports.getByNecessaryPlayers = async (gameId, necessaryPlayers) => {
  const playersInQueue = await prisma.specs.findFirst({
    where: {
      specsId: gameId,
      necessaryPlayers
    },
  })
  
  return playersInQueue;
}