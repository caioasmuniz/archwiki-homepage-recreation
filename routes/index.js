var Users = require('../model/Users')
var Post = require("../model/Post");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/login", function (req, res, next) {
  const body = req.body;
  Users.find(body.username).then((user) => {
    if (Post.hash(body.senha) == user.senha) res.render("user", { user: user });
  });
});

router.get("/usersdb", function (req, res, next) {
  Users.find().then((users) => {
    res.render("usersdb", { users: users });
  });
});

router.get("/cadastro", function (req, res, next) {
  res.render("cadastro");
});

router.post("/cadastro", function (req, res, next) {
  const body = req.body;
  Post.insert(body);
  res.redirect("/");
});

module.exports = router;
