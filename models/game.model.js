const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    completed: { type: Boolean, required: true },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }],
    players: [{
        type: Schema.Types.ObjectId,
        ref: "Player"
    }]
})

module.exports = mongoose.model('Game', gameSchema)