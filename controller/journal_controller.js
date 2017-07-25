const Journal = require('../models/Journal')

function create (req, res) {
  var newJournal = new Journal({
    name: req.body.journal.name
  })

  newJournal.save(function (err, createdJournal) {
    if (err) {
      res.send(err)
    }

    res.redirect('/users/journal')
  })
}

// function journal function

// delete journal function
