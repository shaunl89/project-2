const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be between 3 and 20 characters'],
    maxlength: [20, 'Name must be between 3 and 20 characters'],
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please type your email'],
    match: emailRegex
  },
  password: {
    type: String,
    required: [true, 'Please type your password'],
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  }
})

userSchema.pre('save', function(next) {
  var user = this // this refers to theUserObj instance

  // only hash the pw if it has been modified (or is new)
  if (!user.isModified('password')) return next()
  // hash the password asynchronously
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (givenPassword) {

  // true or false based on the user.hashed compared with form.password
  return bcrypt.compareSync(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
