const express = require('express')
const Farm = require('../models/farm')
const User = require('../models/user')
const Groceries = require('../models/groceries')
const jwt = require('jsonwebtoken')
const GroceryItem = require('../models/groceries')

const farm = express.Router()

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

//Index
farm.get('/', (req, res) => {
  User.find({}, (error, foundFarm) => {
    if(error){
      res.status(400).json({error: error.message})
    } else {
      foundFarm.forEach(farm => {
        farm.password = ''
      })
      Groceries.find({}, (err, grocereyItem) => {
        res.status(200).json({
          farm: foundFarm,
          groceries: grocereyItem
        })
      })
    }
})
})

//Create
farm.post('/', verifyToken, (req, res) => {
  const userData = jwt.verify(req.token, process.env.TOKEN_SECRET)
  // assign owner id to farm
  req.body.owner = userData.user.id
  Farm.create(req.body, (error, createdFarm) => {
    if(error){
      res.status(400).json({ error: error.message })
    }
    res.status(200).send(createdFarm)
  })
})

farm.get('/:id', (req, res) => {
  Farm.findById(req.params.id, (err, foundFarm) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      const items = []
      Groceries.find({}, (err, groceries) => {
        if (err) {
          res.status(400).json({
            error: err
          })
        } else {
          res.status(200).json({
            farm: foundFarm,
            groceries: groceries
          })
        }
      })
    }
  })
})

//Delete
farm.delete('/:id', verifyToken, (req, res) => {
  Farm.findByIdAndRemove(req.params.id, (error, deletedFarm) => {
    if(error){
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(deletedFarm)
  })
})

//update
farm.put('/:id', verifyToken, (req, res) => {
  Farm.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedFarm) => {
    if(error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(updatedFarm)
  })
})

module.exports = farm