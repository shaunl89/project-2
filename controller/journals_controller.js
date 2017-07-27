const Journal = require('../models/Journal')
const User = require('../models/User')

function index (req, res) {
  User.findOne({
    _id: req.user
  })
  .populate('journals')
  .exec(function (err, user) {
    if (err) {
      return res.send(err)
    } else {
      console.log(user)
      res.render('journals/index', {
        user: user,
        journals: user.journals
      })
    }
  })
}

function show (req, res) {
  Journal.findOne({
    _id: req.params.id
  })
  .exec(function (err, journal) {
    if (err) {
      return res.send(err)
    } else {
      console.log('this clicked journal', journal)
      res.render('journals/show', {
        journal: journal
      })
    }
  })
}

function create (req, res) {
  var newJournal = new Journal({
    name: req.body.journal.name,
    location: req.body.journal.location,
    text: req.body.journal.text
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

    res.redirect('/journals')
  })
}

//     if (err) {
//       return res.send(err)
//     } else {
//       res.render('journals/index', {
//         journal: journal,
//         user: req.user
//       })
//     }
//   })
// }

// update journal function
// function destroy (req, res) {
//
// }

// delete journal function

module.exports = {
  index,
  show,
  create
}
