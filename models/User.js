const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    required: [true, 'Please type your email']
  },
  password: {
    type: String,
    required: [true, 'Please type your password'],
    minlength: [8, 'Password too short']
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
