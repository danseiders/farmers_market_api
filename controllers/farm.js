const express = require('express')

const farm = express.Router()

farm.get('/', (req, res) => {
  res.status(200).send({
    message: 'add farm info here'
  })
})

module.exports = farm