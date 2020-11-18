// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const users = express.Router()
const User = require('../models/user.js')


users.get('/', (req, res) => {
  res.status(200).send({
    message: 'user info goes here'
  })
})


users.post('/new', (req, res) => {
  User.find({ username: req.body.username }, (err, foundUser) => {
    if (foundUser.length > 0) {
      res.status(400).json({ error: 'User already exists' })
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      User.create(req.body, (err, createdUser) => {
        res.status(200).json({ newUser: createdUser })
      })
    }
  })
})

module.exports = users