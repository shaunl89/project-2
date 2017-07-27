const Journal = require('../models/Journal')
const User = require('../models/User')

// show all user's journals
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
        journals: user.journals,
        flash: req.flash('errors')
      })
    }
  })
}

// on click of journal name, show its contents
function show (req, res) {
  User.findOne({
    _id: req.user
  })
  .exec(function (err, user) {
    if (err) {
      return res.send(err)
    } else {
      Journal.findOne({
        _id: req.params.id
      })
      .exec(function (err, journal) {
        if (err) {
          return res.send(err)
        } else {
          console.log('this clicked journal', journal)
          res.render('journals/show', {
            journal: journal,
            user: user
          })
        }
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
    if (err) {
      req.flash('errors', err.message)
    }
    // return res.redirect('/journals')

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

// delete journal function
function destroy (req, res) {
  console.log('this is the delete function')
  console.log(req.params)
  Journal
  .findOneAndRemove({
    _id: req.params.id
  }, function (err) {
    if (err) res.send(err)

    res.redirect('/journals')
  })
}

function update (req, res) {
  console.log('this is the update function')
  console.log(req.params)
  console.log(req.body)
  Journal
  .findOneAndUpdate({
    _id: req.params.id
  }, {
    $set: {
      name: req.body.update.name,
      location: req.body.update.location,
      text: req.body.update.text
    }
  }, function (err) {
    if (err) {
      return res.send(err)
    } else {
      res.redirect('/journals')
    }
  })
}

module.exports = {
  index,
  show,
  create,
  destroy,
  update
}
