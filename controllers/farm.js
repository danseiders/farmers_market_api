const express = require('express')
const { isRegExp } = require('util')
const Farm = require('../models/farm')

const farm = express.Router()

//Index
farm.get('/', (req, res) => {
  Farm.find({}, (error, foundFarm) => {
    if(error){
      res.status(400).json({error: error.message})
    }
    res.status(200).send(foundFarm)
})
})

//Create
farm.post('/', (req, res) => {
  Farm.create(req.body, (error, createdFarm) => {
    if(error){
      res.status(400).json({ error: error, message })
    }
    res.status(200).send(createdFarm)
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