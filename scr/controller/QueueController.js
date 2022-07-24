const queueService = require('../services/Queue.Service');

exports.getAllQueue = async (req, res) => {
  try {

    const allQueue = await queueService.showAllQueues();
    return res.status(200).json(allQueue);

  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.howToSaveJustTest = async (req,res) => {
  try {

    const gameTest = await queueService.joinQueue();
    console.log(ga);
    return res.status(200).json(gameTest);

  } catch (error) {
    return res.status(500).json(error.message);
  }
}