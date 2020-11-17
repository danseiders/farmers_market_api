const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI

//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('🎉')
})

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})