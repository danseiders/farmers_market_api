const mongoose = require('mongoose')

const marketSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  image: String
})

const Market = mongoose.model('Market', marketSchema)

module.exports = Market