const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema ({
    gameName : {
        type : String,
        required: true
    },
    spec: [{
        necessaryPlayers: Number,
        queuePlayer: [{playerName: String}]
    }]
});

const queueGame = mongoose.model('Queue', PostSchema);

module.exports = queueGame;


