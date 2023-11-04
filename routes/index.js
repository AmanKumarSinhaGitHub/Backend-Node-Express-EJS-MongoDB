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

// Searching a user by its username
router.get("/findUser", async function(req, res) {
  
  let regex = new RegExp("^AmanKumarSinha$", "i");

  const user = await userModel.find({ userName: regex });

  res.send(user);
});


module.exports = router;