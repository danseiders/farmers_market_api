const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT


app.get('/', (req, res) => {
  res.send('🎉')
})

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`)
})