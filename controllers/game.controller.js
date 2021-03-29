const Game = require('../models/game.model')
const router = require('express').Router()

const postNewGame = (req, res) => {
    const newGame = new Game({ completed: false })
    return newGame.save()
        .then(game => res.json(game))
        .catch(err => err)
}

const getAllGames = (req, res) => {
    return res.json("gotcha")
}

router.route('/new').post(postNewGame)
router.route('/').get(getAllGames)

module.exports = router