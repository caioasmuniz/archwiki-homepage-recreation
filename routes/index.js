var Users = require('../model/Users')
var Cadastro = require("../model/Cadastro");
var Posts = require("../model/Posts");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/login", function (req, res, next) {
  const body = req.body;
  Users.find(body.username).then((user) => {
    if (Cadastro.hash(body.senha) == user.senha) res.render("user", { user: user });
  });
});

router.get("/cadastro", function (req, res, next) {
  res.render("cadastro");
});

router.post("/cadastro", function (req, res, next) {
  const body = req.body;
  let isEmail = false;
  let isUser = false;
  Users.find(body.username).then((user) => {    
    if (user != null){
      isUser = true;
    }    
  }).then(()=>{
    Users.findEmail(body.email).then((usermail) => {
      if (usermail != null){
        isEmail = true;
      }
    })
    .then(()=>{
      if(isEmail || isUser)
        console.log("Email ou usuário existentes!!");   
      else
        Cadastro.insert(body);
        
      res.redirect("/");
    })
  })
});

router.get("/posts", function (req, res, next) {
  const busca = req.query.busca;
    Posts.findPosts(busca).then((user) => {             
      res.render('postagens', {user: user});
  })
});

// router.get("/posts", async (req, res, next) => {
//   const busca = req.query.busca;  
//     user = await Posts.findPosts(busca);
//     console.log(user);       
//     res.render('user', {user: user});  
// });

// router.post("/posts", function (req, res, next) {
//   const body = req.body;
//   let pub = 0;
//   let id;
//   let post;   
//   Posts.findNpublic().then((user) => {       
//     pub = user.numPublicacoes +1;
//     id = user._id
//     post = user;
//   }).then(()=>{      
//         Posts.postContent(body.publicacoes, pub, id);
//         // res.redirect("user");
//         console.log(post)
//         res.render('user', {user: post});
//     })  
// });

router.post("/posts", function (req, res, next) {
  const body = req.body;
  let posts;
       
  Posts.postContent(body.publicacoes);
  Posts.findUser().then((users) => {
    res.render("postagens", {user: users});
  })
        // console.log(user)
        // res.send({user: user});
        
        // res.redirect("user");      
});

module.exports = router;
