const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSet = new Schema({
    cards: Array,
    guesser: Boolean,
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    solved: Boolean
})

module.exports = mongoose.model('CardSet', cardSet)

// this array has card id's only. can grab all cards like:
// db.cardCollection.find({_id:{$in: guessedSet.cards}})