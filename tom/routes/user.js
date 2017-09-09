var express = require('express');
var router = express.Router();
const db = require('./../logic/DatabaseWrapper');
let oid = require("mongodb").ObjectId;


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
        email: (result.mail) ? result.mail : '',
        phone: (result.phone) ? result.phone : '',
        ID: result._id
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
      { _id: oid(req.query.ID) },
      { $addToSet: {skills: req.query.skill.toLowerCase()}}
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

router.get('/skill/search', function(req, res, next) {

  res.type('application/json');

  if(!req.query.skill) {
    res.status(400);
    res.end(JSON.stringify({
      errmsg: 'No skill to search for'
    }));
  }

  db.getInstance().then(db => {
    db.collection('users').findOne({
      skill: req.query.skill.toLowerCase()
    }).then(result => {
      let response = {
        name: result.name,
        fullName: result.fullName,
        bday: (result.bday) ? result.bday : '',
        email: (result.mail) ? result.mail : '',
        phone: (result.phone) ? result.phone : '',
        ID: result._id
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
