const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // here we define our props

})

// we export a Model object of mongoose and we need to pass it our schema and give it a name.
module.exports = mongoose.model('User', userSchema)