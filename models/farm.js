const mongoose = require('mongoose')

const farmSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: String,
  location: String,
  email: String,
  items: []
})

const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm