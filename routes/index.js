var express = require('express');
var router = express.Router();

// Importing User.js
const userModel = require("./users")

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

// Creating Data
router.get("/create", async function (req, res) {
  let userData = await userModel.create({
    userName: "dhiraj kumar",
    nickname: "android",
    description: "I am a android developer",
    categories: ["kotlin", "python", "java", "mongodb"]
  })

  res.send(userData)
});

// Get data
router.get('/getUsers', async function (req, res) {

  const allUserData = await userModel.find({});

  // Send the user data as a JSON response
  res.json(allUserData);
});

// Q1. Searching a user by its username (case insensitive)
router.get("/findUser", async function (req, res) {

  let regex = new RegExp("^AmanKumarSinha$", "i");

  const user = await userModel.find({ userName: regex });

  res.send(user);
});

// Q2. Finding in array

router.get("/findUserUsingArray", async function (req, res) {

  const user = await userModel.find({ categories: { $all: ["nodejs"] } });

  res.send(user);
});

// Q3. Finding using Date when data is created.

router.get("/findUserUsingDate", async function (req, res) {

  let startingDate = new Date('2023-11-02')
  let lastDate = new Date('2023-11-05')

  // $gte (greater than or equal to) and $lte (less than or equal to) operator.
  const user = await userModel.find({dateCreated: {$gte: startingDate, $lte: lastDate}});

  res.send(user);
});

// Q4. Find user if any specific field exist

router.get("/isFieldExist", async function (req, res) {

  const user = await userModel.find({userName: {$exists: true}});

  res.send(user);
});

// Q5. Find username which length is less than 10 and greater than 3 letter.

router.get("/findByLength", async function(req, res){
  let user = await userModel.find({
    $expr:{
      $and:[
        {$gte: [{$strLenCP: '$userName'}, 3]},
        {$lte: [{$strLenCP: '$userName'}, 10]}
      ]
    }
  })
  res.send(user)
})


module.exports = router;