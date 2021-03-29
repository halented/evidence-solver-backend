const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    group: Number,
    name: String,
    players: Array,
    solved: { type: Boolean, required: true },
})

module.exports = mongoose.model('Card', cardSchema)

// I am not sure that array as a type is valid here
// it will be an array of objects and each object will house an ID and a boolean to show whether or not that player holds that card like so:
// players: [
//     {
//         id: 472,
//         status: false
//     }
// ]