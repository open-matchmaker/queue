const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const tests = {
  data: {
    gameName : 'CS:GO',
    spec: [{
      necessaryPlayers: 2,
      queuePlayer: [{playerName: 'Hans'},{playerName: 'Arthur'}]
  },
  {
    necessaryPlayers: 4,
    queuePlayer: [{playerName: 'Cabeca'},{playerName: 'Pedro'}]
  }]
  }
}

exports.joinQueue = async (gameName, necessaryPlayers, playerName) => {
  const gameInQueue = await this.getByGameName(tests.data.gameName)
  if(gameInQueue) throw Error('game is already on queue');

  await prisma.game.create(tests);

}

exports.showAllQueues = async () => {
  const allQueue = await prisma.game.findMany()
  return allQueue;
}

exports.getByGameName = async (gameName) => {
  const gameInQueue = await prisma.game.findUnique({
    where: {
      gameName: gameName
    },
  });
  return gameInQueue;
}