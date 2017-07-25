const Journal = require('../models/Journal')
const User = require('../models/User')

function create (req, res) {
  var newJournal = new Journal({
    name: req.body.journal.name
  })

  newJournal.save(function (err, createdJournal) {
    if (err) res.send(err)

    User
    .findOne({
      _id: req.user.id
    }, function (err, user) {
      if (err) res.send(err)
      user.journals.push(newJournal.id)
      user.save()
    })

    res.redirect('/users/profile')
  })
}

// get request
// show function -> findAll

// update journal function
// function destroy (req, res) {
//
// }

// delete journal function

module.exports = {
  create
}
