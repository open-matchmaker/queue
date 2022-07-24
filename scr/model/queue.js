const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema ({
    gameName : {
        type : String,
        required: true
    },
    queueGame: [{
        necessaryPlayers: Number,
        playersInQueue: [{namePlayer: String}]
    }]
});

const queueGame = mongoose.model('Queue', PostSchema);

module.exports = queueGame;


