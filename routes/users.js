var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  const body = req.body;
  res.send(body);
});

module.exports = router;
