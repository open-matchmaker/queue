const express = require('express');
const route = express.Router()

const queueController = require('../controller/QueueController')

route.get('/', queueController.getAllQueue);
route.get('/add', queueController.howToSaveJustTest);

module.exports = route;