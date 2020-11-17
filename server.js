// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// Configuration
require('dotenv').config()
const PORT = process.env.PORT

// Controllers
const farmController = require('./controllers/farm.js')
app.use('/farm', farmController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

app.get('/', (req, res) => {
  res.send('🎉')
})

// Listener
app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})