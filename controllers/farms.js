const express = require('express')
const Farm = require('../models/farm')
const User = require('../models/user')
const Groceries = require('../models/groceries')
const Market = require('../models/market.js')
const jwt = require('jsonwebtoken')

const farm = express.Router()

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
        Market.find({}, (err, foundMarkets) => {
          if (err) {
            res.status(400).json({
              error: err
            })
          } else {
            res.status(200).json({
              farm: foundFarm,
              groceries: grocereyItem,
              markets: foundMarkets
            })
          }
        })
      })
    }
})
})

//Create
farm.post('/', (req, res) => {
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
farm.delete('/:id', (req, res) => {
  Farm.findByIdAndRemove(req.params.id, (error, deletedFarm) => {
    if(error){
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(deletedFarm)
  })
})

//update
farm.put('/:id', (req, res) => {
  Farm.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedFarm) => {
    if(error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(updatedFarm)
  })
})

module.exports = farm