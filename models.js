const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    'title': { type: String, required: true },
    'commentcount': { type: Number, default: 0 },
    'comments': [String]
})

const bookModel = mongoose.model('Books', bookSchema)

module.exports = bookModel