const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guessedSet = new Schema({
    cards: Array,
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    solved: Boolean
})

module.exports = mongoose.model('GuessedSet', guessedSet)

// this array has card id's only. can grab all cards like:
// db.cardCollection.find({_id:{$in: guessedSet.cards}})