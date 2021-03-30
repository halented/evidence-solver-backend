const seeder = require("mongoose-seed")

require('dotenv').config()
const source = process.env.ATLAS_CONNECTION

seeder.connect(source,
    function () {

        // Load Mongoose models
        seeder.loadModels([
            './models/player.model.js',
            './models/card.model.js',
            './models/game.model.js'
        ])

        // Clear specified collections
        seeder.clearModels(['Player', 'Card', 'Game'], function () {

            console.log("Cards, Games, and Players dropped from DB.")

        })
    }
)