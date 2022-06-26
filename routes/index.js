var Users = require('../model/Users')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/usersdb', function(req, res, next) {
  Users.find().then((users) => {
    res.render('usersdb', {users: users})
  });
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');  
});

module.exports = router;
