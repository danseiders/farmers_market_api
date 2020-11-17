const express = require('express')

const users = express.Router()

users.get('/', (req, res) => {
  res.status(200).send({
    message: 'user info goes here'
  })
})

module.exports = users