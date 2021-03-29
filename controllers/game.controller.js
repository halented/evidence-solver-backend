const Game = require('../models/game.model')
const Player = require('../models/player.model')
const Card = require('../models/card.model')
const router = require('express').Router()

const postNewGame = async (req, res) => {

    // post the game itself
    const newGame = new Game({ completed: false })
    const savedGame = await newGame.save()
        .catch(err => err)

    // if game successfully posted, post players
    if (savedGame._id) {
        // create player instances
        const playerIds = []
        for (player of req.body.players) {
            let tempPlayer = new Player({ user: false, name: player, game: savedGame._id })
            let savedPlayer = await tempPlayer.save()
            playerIds.push(savedPlayer._id)
        }

        // create user instance
        const user = await new Player({ user: true, name: req.body.user, game: savedGame._id })
        playerIds.push(user._id)

        // add their id's to the game info
        savedGame.players = playerIds

        // save it & server json
        await savedGame.save()
        return res.json(savedGame)
    }
    else {
        return res.status(400).json(savedGame)
    }
}

const createPlayers = (players, gameId) => {
    // create all players here
}

const getAllGames = (req, res) => {
    return res.json("gotcha")
}

router.route('/new').post(postNewGame)
router.route('/').get(getAllGames)

module.exports = router