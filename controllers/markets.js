const express = require('express')
const Market = require('../models/market.js')
const Farm = require('../models/farm.js')
const markets = express.Router()

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

markets.get('/', (req, res) => {
  Market.find({}, (err, foundMarkets) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      res.status(200).json({
        markets: foundMarkets
      })
    }
  })
})

// Create market route
// This will be primarily for admin use; the route will be there to create markets, but users won't need to access it, so no need to build a UI for this.
markets.post('/new', (req, res) => {
  Market.create(req.body, (err, createdMarket) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      res.status(200).json({
        market: createdMarket
      })
    }
  })
})

// Similar to the create market route, this will be an admin command and won't need a UI to be developed
markets.put('/edit/:id', (req, res) => {
  Market.findByIdAndUpdate(req.params.id, req.body, (err, updatedMarket) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      Market.findById(req.params.id, (err, foundMarket) => {
        if (err) {
          res.status(400).json({
            error: err
          })
        } else {
          res.status(200).json({
            updatedMarket: foundMarket
          })
        }
      })
    }
  })
})

module.exports = markets