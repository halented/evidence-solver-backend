// import tools
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// add atlas key to local environment
require('dotenv').config()

// start our backend app & set the port on which it should run
const app = express()
const PORT = process.env.PORT || 5000

// allow access from multiple origins & use of json 
app.use(cors())
app.use(express.json())

// start local server
app.listen(PORT, () => {
    console.log(`App served on port ${PORT}...`)
})

// connect database
const source = process.env.ATLAS_CONNECTION
mongoose.connect(source, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("database connection success.")
})

// add routes & usage
// need custom route for starting a game which populates all cards & players for the game