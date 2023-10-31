var express = require('express');
var router = express.Router();

// Importing mongodb setup code that is written in user.js

const userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {

  // Session code here
  req.session.anyExampleNameHere = 'exampleUserData'; // Storing user data in the session


  // Cookies code here
  res.cookie("nameHere", "valueHere")

  res.render('index');
});

// Read cookie

router.get('/checkCookie', function(req, res){
  console.log(req.cookies)
  res.send("check console/terminal for cookie")
})

// delete cookie

router.get('/deleteCookie', function(req, res){
  res.clearCookie("nameHere")
  res.send("cleared cookie")
})

// checking session
router.get('/checkSession', function(req, res){

  if(req.session.anyExampleNameHere == "exampleUserData"){
    console.log(req.session)
    res.send("Session saved. see on your console/terminal")
  }
  else{
    res.send("Session data is not available or deleted")
  }
})

// Deleting session
router.get("/removeSession", function(req, res){
  req.session.destroy(function(err){
    if(err) throw err;
    res.send("session deleted")
  })
})

// Creating model. 
router.get("/create", async function (req, res){
  const createdUser = await userModel.create({
    // these are schema details
    username: "aman",
    name: "aman kumar sinha",
    age: 20
  });
  res.send(createdUser);
})
// Note: all the things related to userModel is asynchronous nodejs function. So always write async and await

// See data (READ data)
router.get("/allUser", async function(req, res){
  let users = await userModel.find()
  res.send(users)
})

// DELETE Data
router.get("/delete", async function(req, res){
  let deletedUser = await userModel.findOneAndDelete({
    username:"aman"
  })
  res.send(deletedUser)
})
// the above code will find user that username is aman and delete it and return its data to deletedUser variable

module.exports = router;