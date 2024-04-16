const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

db = mongoose.connect(uri)

module.exports = db

