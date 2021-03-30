const Game = require('../models/game.model')
const Player = require('../models/player.model')
const Card = require('../models/card.model')

const router = require('express').Router()

const formatNewDeck = (gameId, playerIds) => {
    const cardDetails = [
        {
            group: 1,
            name: "Colonel Mustard"
        },
        {
            group: 1,
            name: "Professor Plum"
        },
        {
            group: 1,
            name: "Mr. Green"
        },
        {
            group: 1,
            name: "Mrs. Peacock"
        },
        {
            group: 1,
            name: "Miss Scarlet"
        },
        {
            group: 1,
            name: "Mrs. White"
        },
        {
            group: 2,
            name: "Knife"
        },
        {
            group: 2,
            name: "Candlestick"
        },
        {
            group: 2,
            name: "Revolver"
        },
        {
            group: 2,
            name: "Rope"
        },
        {
            group: 2,
            name: "Lead Pipe"
        },
        {
            group: 2,
            name: "Wrench"
        },
        {
            group: 3,
            name: "Hall"
        },
        {
            group: 3,
            name: "Lounge"
        },
        {
            group: 3,
            name: "Dining Room"
        },
        {
            group: 3,
            name: "Kitchen"
        },
        {
            group: 3,
            name: "Ballroom"
        },
        {
            group: 3,
            name: "Conservatory"
        },
        {
            group: 3,
            name: "Billiard Room"
        },
        {
            group: 3,
            name: "Library"
        },
        {
            group: 3,
            name: "Study"
        }
    ]
    const cardSchemas = cardDetails.map(card => {
        return new Card({
            game: gameId,
            group: card.group,
            name: card.name,
            players: playerIds,
            solved: false
        })
    })

    return cardSchemas
}

const createPlayerInstances = async (gameId, players) => {
    const playerIds = []

    for (player of players) {

        let savedPlayer = await new Player({ user: false, name: player, game: gameId }).save()

        playerIds.push(savedPlayer._id)
    }

    return playerIds
}

const postNewGame = async (req, res) => {

    // post the new game instance itself
    const newGame = new Game({ completed: false })
    const savedGame = await newGame.save()
        .catch(err => err)

    // if game successfully posted, post players & cards
    if (savedGame._id) {

        // create player instances
        const playerIds = await createPlayerInstances(savedGame._id, req.body.players)

        // create user instance
        const user = await new Player({ user: true, name: req.body.user, game: savedGame._id }).save()
        playerIds.push(user._id)

        // create and commit new deck to the database
        const savedCards = await Card.insertMany(formatNewDeck(savedGame._id, playerIds))

        // add players and cards to game 
        savedGame.players = playerIds
        savedGame.cards = savedCards.map(card => card._id)

        // save it & serve json
        await savedGame.save()
        return res.json(savedGame)
    }
    else {
        return res.status(400).json(savedGame)
    }
}

const getAllGames = (req, res) => {
    return res.json("gotcha")
}

router.route('/new').post(postNewGame)
router.route('/').get(getAllGames)

module.exports = router