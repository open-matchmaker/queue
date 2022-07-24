const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const tests = {
  data: {
    gameName : 'League Of Legends',
    spec: [{
      necessaryPlayers: 2,
      queuePlayer: [{playerName: 'Hans'}]
  }]
  }
}

exports.joinQueue = async () => {
  const test = await prisma.game.create(tests)
  return test;

}

exports.showAllQueues = async () => {
  const allQueue = await prisma.game.findMany()
  return allQueue;
}