// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Configuration
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI


//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//DATABASE
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, () => {
  console.log(`Connected to MONGODB at ${MONGODB_URI}`)
})

// Controllers
const farmController = require('./controllers/farm.js')
app.use('/farm', farmController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const groceriesController = require('./controllers/groceries')
app.use('/groceries', groceriesController)


//index view to show deployment
app.get('/', (req, res) => {
  res.send('🎉')
})

// Listener
app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})