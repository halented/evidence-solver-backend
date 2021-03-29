const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    cards: Array,
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    cardSets: [{
        type: Schema.Types.ObjectId,
        ref: "GuessedSet"
    }],
    name: { type: String, required: true },
    user: { type: Boolean, required: true }
})

module.exports = mongoose.model('Player', playerSchema)

// the user attribute indicates whether this player is also the person operating the app