var express = require('express');
var router = express.Router();

const userModel = require("./users")
const passport = require('passport');


// Define a local strategy for Passport
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

// Route for the home page
router.get('/', function(req, res, next) {
  res.render('index');
});

// Route for the profile page with authentication check
router.get("/profile", isLoggedIn, function(req, res){
  res.render("profile");
})

// Register Route: Handle user registration
router.post("/register", function(req, res){

  let userdata = new userModel({
    username : req.body.username,
    secret: req.body.secret
  })

  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })

});

// Log in Route: Authenticate and redirect
router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function (req, res){ })


// Logout Route: Handle user logout
router.get("/logout", function(req, res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/");
  })
});

// Middleware function to check if a user is authenticated
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

module.exports = router;