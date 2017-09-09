var express = require('express');
var router = express.Router();
const db = require('./../logic/DatabaseWrapper');


router.get('/', function(req, res, next) {
  res.type('application/json');

  if(!req.query.name) {
    res.status(400);
    res.end(JSON.stringify({
      errmsg: 'No name provided'
    }))
  }

  db.getInstance().then(db => {
    db.collection('users').findOne({
      name: req.query.name.toLowerCase()
    }).then(result => {
      let response = {
        name: result.name,
        fullName: result.fullName,
        bday: (result.bday) ? result.bday : '',
        email: (result.mail) ? result.mail : ''
      }

      res.send(JSON.stringify(
        response
      ));
    }).catch(err => {
      res.status(404);
      res.end(JSON.stringify({
        msg: err.message
      }))
    });
  });
});

module.exports = router;
