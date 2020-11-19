// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const cors = require('cors')

// Configuration
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const whitelist = ['http://localhost:3000', 'https://farm-stan-client.herokuapp.com/']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// app.use(cors(corsOptions))

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

const marketController = require('./controllers/markets.js')
app.use('/markets', marketController)

//index view to show deployment
app.get('/', (req, res) => {
  res.send('🎉')
})

// Listener
app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})