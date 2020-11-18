// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// Configuration
require('dotenv').config()
const PORT = process.env.PORT

<<<<<<< HEAD
//DATABASE
const MONGODB_URI = process.env.MONGODB_URI

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

=======
// Controllers
const farmController = require('./controllers/farm.js')
app.use('/farm', farmController)

const userController = require('./controllers/users.js')
app.use('/users', userController)
>>>>>>> c2b456fe4c2603e92b4aca62430b2665614a5a8f

app.get('/', (req, res) => {
  res.send('🎉')
})

// Listener
app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})