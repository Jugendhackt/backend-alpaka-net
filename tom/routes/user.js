var express = require('express');
var router = express.Router();
const db = require('./../logic/DatabaseWrapper');

// Route: /user/?name=[Name]
router.get('/', function(req, res, next) {
  res.type('application/json');

  // validate name
  if(!req.query.name) {
    res.status(400);
    res.end(JSON.stringify({
      errmsg: 'No name provided'
    }))
  }

  // get search query
  /** @type {string} name */
  const Name = req.query.name.toLowerCase();

  db.getInstance().then(db => {
    db.collection('users').findOne({
      name: Name
    }).then(result => {
      const response = {
        name: result.name,
        fullName: result.fullName,
        bday: (result.bday) ? result.bday : '',
        email: (result.mail) ? result.mail : ''
      }

      res.send(JSON.stringify(
        response
      ));
    }).catch(err => {
      // most likely mongodb returned some kind of crap
      res.status(404);
      res.end(JSON.stringify({
        msg: err.message
      }))
    });
  });
});

//router.use('/skill', function(req, res, next) {
  router.get('/skill/add', function(req, res, next) {

    res.type('application/json');

    if(!req.query.ID) {
      res.status(400);
      res.end(JSON.stringify({
        errmsg: 'No ID provided'
      }));
    }
    if(!req.query.skill) {
      res.status(400);
      res.end(JSON.stringify({
        errmsg: 'No skill to add'
      }));
    }

    db.getInstance().then(db => {
      db.collection('users').updateOne(
        { _id: req.query.ID },
        { $addToSet: {skills: [req.query.skill]}}
      ).then(result => {
        res.status(200);
        res.send(JSON.stringify({
          msg: result
        }));
      }).catch(err => {
        res.status(404);
        res.end(JSON.stringify({
          errmsg: err.message
        }))
      });
  });

  });
//});

module.exports = router;
