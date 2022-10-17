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
  let specsId = ""
  const gameInQueue = await this.getByGameName(gameName);

  
  if (!gameInQueue) {
    const gameQueue = await this.createGame(gameName, necessaryPlayers, playerName)
    specsId = await this.getByNecessaryPlayers(gameQueue.id, necessaryPlayers)
  }

  if (gameInQueue) {
    const playersQueue = await this.getByNecessaryPlayers(gameInQueue.id, necessaryPlayers)

    if (playersQueue) {
      specsId = await this.updateQueueSpec(playersQueue, playerName)
    };
    if (!playersQueue) {
      specsId = await this.createQueue(gameInQueue.id, necessaryPlayers, playerName)
    };
    
  }

  return await this.itsMatch(specsId, necessaryPlayers)
}

exports.itsMatch = async (specsId, necessaryPlayers) => {
  const match = await this.getByNecessaryPlayers(specsId.specsId, necessaryPlayers)
  
  if( match.necessaryPlayers === match.queuePlayer.length) {
    await this.cleanQueue(specsId.id);
    return {queueId: specsId.id,message: 'Its a Match!', queue: match.queuePlayer}
  }
  
  return {queueId: specsId.id, message: `Its necessary ${(match.necessaryPlayers - match.queuePlayer.length)} players`}
}

exports.disconnectQueue = async (gameName, necessaryPlayers, playerName) => {
  let specsId = ""
  let playersQueue = "";
  const gameInQueue = await this.getByGameName(gameName);


  if (gameInQueue) {
    playersQueue = await this.getByNecessaryPlayers(gameInQueue.id, necessaryPlayers)


    if (playersQueue) {
      specsId = await this.removePlayerQueue(playersQueue, playerName)
    };
    
  }

}

exports.removePlayerQueue = async (playersQueue, playerName) => {
  let newObject = playersQueue.queuePlayer

  newObject = newObject.filter(data => data.playerName !== playerName)

  const updatedQueue = await prisma.specs.update({
    where: {
      id: playersQueue.id
    },
    data: {
      queuePlayer: newObject
    }
  });

  return updatedQueue;
}

exports.cleanQueue = async (id) => {
  const cleanQueue = await prisma.specs.update({
    where: {
      id
    },
    data: {
      queuePlayer: []
    }
  })
  return cleanQueue
}

exports.updateQueueSpec = async (playersQueue, playerName) => {
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
  const newQueue = await prisma.specs.create({
    data: {
      specsId: gameId,
      necessaryPlayers,
      queuePlayer: [{playerName}]
    }
  })
  return newQueue
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