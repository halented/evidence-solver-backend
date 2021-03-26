const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoGivenSet = new Schema({
    cards: Array,
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true
    },
    solved: Boolean
})

module.exports = mongoose.model('InfoGivenSet', infoGivenSet)

// card array has objects: 
// id of card && whether or not it's still possible
// {id: `${card.id}`, isPossible: true}