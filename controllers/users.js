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

users.post('/login', (req, res) => {
  User.find({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err })
    }
    else if (foundUser.length === 0) {
      res.status(400).json({ error: 'User not found' })
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser[0].password)) {
        res.status(200).json({ message: 'auth successful!' })
      } else {
        res.status(400).json({ message: 'Invalid password' })
      }
    }
  })
})

users.post('/new', (req, res) => {
  User.find({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err })
    }
    else if (foundUser.length > 0) {
      console.log(req.body)
      console.log(foundUser)
      res.status(400).json({ error: 'User already exists' })
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      User.create(req.body, (err, createdUser) => {
        if (err) {
          res.status(400).json({ error: message })
        } else {
          res.status(200).json({ newUser: createdUser })
        }
      })
    }
  })
})

module.exports = users