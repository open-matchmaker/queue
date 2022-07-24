const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.joinQueue = async () => {

}

exports.showAll = async () => {
  const allQueue = await prisma.game.findMany()
  console.log(allQueue);
}