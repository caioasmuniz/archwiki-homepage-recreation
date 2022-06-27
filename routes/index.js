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

router.get("/cadastro", function (req, res, next) {
  res.render("cadastro");
});

router.post("/cadastro", function (req, res, next) {
  const body = req.body;
  Users.find(body.username).then((user) => {    
    if(user != null)
        console.log("Email ou usuário existentes!!");
    else
      Post.insert(body);

    res.redirect("/");
  });
});

module.exports = router;
