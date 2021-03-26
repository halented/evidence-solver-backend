const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    cards: Array,
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    guessedSets: [{
        type: Schema.Types.ObjectId,
        ref: "GuessedSet"
    }],
    infoGivenSets: [{
        type: Schema.Types.ObjectId,
        ref: "InfoGivenSet"
    }],
    name: String,
    user: Boolean
})

module.exports = mongoose.model('Player', playerSchema)