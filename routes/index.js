var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Flash
router.get('/age', function(req, res) {
  req.flash("age", 20);
  res.send('Age is 20');
});

router.get('/checkAge', function(req, res) {
  
  res.send("Check terminal/console to get age")
  console.log(req.flash("age"));
});

module.exports = router;
