const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.joinQueue = async () => {

}

exports.showAllQueues = async () => {
  const allQueue = await prisma.game.findMany()
  return allQueue;
}