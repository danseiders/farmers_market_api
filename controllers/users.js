// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const users = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Middleware
const verifyToken = (req, res, next) => {
  // Check if auth header was sent
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    // No token; forbidden
    res.status(403).json({ error: 'Forbidden' })
  }
}

// Routes

// index
users.get('/', verifyToken, (req, res) => {
  const userData = jwt.verify(req.token, process.env.TOKEN_SECRET)
  User.findById(userData.user.id, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).send({
        user: foundUser
      })
    }
  })
})

// login
users.post('/login', (req, res) => {
  User.find({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      res.status(400).json({ error: err })
    }
    // foundUser.legngth === 0 because when no match is found an empty array is still returned
    else if (foundUser.length === 0) {
      res.status(400).json({ error: 'User not found' })
    } else {
      // Password comparison. foundUser[0] because even with just one, User.find returns an array.
      if (bcrypt.compareSync(req.body.password, foundUser[0].password)) {

        // create an object with data to encode for the token
        const user = {
          id: foundUser[0]._id,
          displayName: foundUser[0].displayName,
          email: foundUser[0].email
        }

        // create a token that will be sent back from the front end in the HEADER to verify the identity; this token will be used with middleware to verify
        jwt.sign({ user }, process.env.TOKEN_SECRET, (err, token) => {
          if (err) {
            res.status(400).json({ error: err })
          } else {
            res.status(200).json({ token: token })
          }
        })

        // ***** to-do! *****
        // Make sure to credit Brad Traversy
        // https://github.com/bradtraversy/node_jwt_example/blob/master/app.js
        // https://www.youtube.com/watch?v=7nafaH9SddU
        // ***** ***** *****

      } else {
        res.status(400).json({ message: 'Invalid password' })
      }
    }
  })
})

// create user
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
          res.status(400).json({ error: err })
        } else {

          const user = {
            id: createdUser._id,
            displayName: createdUser.displayName,
            email: createdUser.email
          }

          jwt.sign({ user }, process.env.TOKEN_SECRET, (err, token) => {
            if (err) {
              res.status(400).json({ error: err })
            } else {
              res.status(200).json({ 
                newUser: createdUser,
                token: token })
            }
          })
        }
      })
    }
  })
})

users.put('/update', verifyToken, (req, res) => {
  const user = jwt.verify(req.token, process.env.TOKEN_SECRET)
  req.body.password = req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.findByIdAndUpdate(user.user.id, req.body, (err, userToUpdate) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      User.findById(userToUpdate._id, (err, updatedUser) => {
        if (err) {
          res.status(400).json({ error: err })
        } else {
          res.status(200).json({ user: updatedUser })
        }
      })
    }
  }) 
})

users.delete('/delete', verifyToken, (req, res) => {
  const userData = jwt.verify(req.token, process.env.TOKEN_SECRET)
  User.findByIdAndRemove(userData.user.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      res.status(200).json({
        deletedUser
      })
    }
  })
})

module.exports = users