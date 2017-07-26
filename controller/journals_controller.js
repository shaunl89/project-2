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
function show (req, res) {
  Journal.find({},
  function (err, journal) {
    console.log('journals are ', journal)

    if (err) {
      return res.send(err)
    } else {
      res.render('users/profile', {
        journal: journal
      })
    }
  })
}

// update journal function
// function destroy (req, res) {
//
// }

// delete journal function

module.exports = {
  create,
  show
}
