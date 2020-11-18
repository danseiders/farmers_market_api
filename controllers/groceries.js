const express = require('express')
const GroceryItem = require('../models/groceries')
const item = express.Router()

//Index
item.get('/', (req, res) => {
    GroceryItem.find({}, (error, foundItem) => {
        if(error){
        res.status(400).json({error: error.message})
        }
        res.status(200).send(foundItem) 
    })
})

//Create
item.post('/', (req, res) => {
    GroceryItem.create(req.body, (error, createdItem) => {
        if(error){
        res.status(400).json({ error: error, message })
        }
        res.status(200).send(createdItem)
    })
})

//Delete
item.delete('/:id', (req, res) => {
    GroceryItem.findByIdAndRemove(req.params.id, (error,deletedItem) => {
        if(error){
        res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedItem)
    })
})

//update
item.put('/:id', (req, res) => {
    GroceryItem.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedItem) => {
        if(error) {
        res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedItem)
    })
})

module.exports = item