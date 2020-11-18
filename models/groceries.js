const mongoose = require('mongoose')

const groceryItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    variation: String,
    imgURL: String,
    organic: Boolean

})
const GroceryItem = mongoose.model('Item', groceryItemSchema)

module.exports = GroceryItem