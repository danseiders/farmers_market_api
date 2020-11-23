const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: String,
  items: [String],
  market: String
})

const User = mongoose.model('User', userSchema)

module.exports = User