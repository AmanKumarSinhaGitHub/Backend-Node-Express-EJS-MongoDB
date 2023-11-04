# Intermediate MongoDB

```js
// Install Mongoose Js using terminal

npm install mongoose

// Require and Setup connection for database

const mongoose = require("mongoose")

// Connect to local host mongodb server 
mongoose.connect("mongodb://127.0.0.1:27017/yourDatabaseName")
```

user.js
```js
// Require and Setup connection for database
const mongoose = require("mongoose")


// Connect to local host mongodb server 
mongoose.connect("mongodb://127.0.0.1:27017/practiceDB")


const userSchema = mongoose.Schema({
  userName : String,
  nickname: String,
  description: String,

  categories: {
    type: Array,
    default: []
  },
  // You can also define array like this.
  // categories : [],

  dateCreated: {
    type: Date,
    default: Date.now()
  }

});


module.exports = mongoose.model("user", userSchema); 
```

index.js

```js
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
    userName: "amankumarsinha",
    nickname: "backend dev",
    description: "I am a backend developer",
    categories: ["c", "c++", "python", "java", "html", "css", "javascript", "nodejs", "mongodb", "express"]
  })

  res.send(userData)
});

// Create more userdata by visiting /create route with different data.


// Get data of all users
router.get('/getUsers', async function (req, res) {
  
    const allUserData = await userModel.find({}); 

    // Send the user data as a JSON response
    res.json(allUserData);
});

module.exports = router;
```

Now mongodb setup is completed.

#### Data we have created

``` json
[
    {
        "_id": "654641f737d12d40321eb2a8",
        "userName": "amankumarsinha",
        "nickname": "backend dev",
        "description": "I am a backend developer",
        "categories": [
            "c",
            "c++",
            "python",
            "java",
            "html",
            "css",
            "javascript",
            "nodejs",
            "mongodb",
            "express"
        ],
        "dateCreated": "2023-11-04T13:06:49.884Z",
        "__v": 0
    },
    {
        "_id": "654643ada6324e8988677b5e",
        "userName": "princeraj",
        "nickname": "frontend dev",
        "description": "I am a frontend developer",
        "categories": [
            "html",
            "css",
            "javascript",
            "reactjs"
        ],
        "dateCreated": "2023-11-04T13:14:12.742Z",
        "__v": 0
    },
    {
        "_id": "6546440e554288a8678ea8fc",
        "userName": "adityaprakash",
        "nickname": "full stack",
        "description": "I am a full stack developer",
        "categories": [
            "c",
            "c++",
            "python",
            "java",
            "html",
            "css",
            "javascript",
            "nodejs",
            "mongodb",
            "express",
            "react"
        ],
        "dateCreated": "2023-11-04T13:15:49.009Z",
        "__v": 0
    },
    {
        "_id": "65464464dfe0feb2eb3b99a0",
        "userName": "dhiraj",
        "nickname": "android",
        "description": "I am a android developer",
        "categories": [
            "kotlin",
            "python",
            "java",
            "mongodb"
        ],
        "dateCreated": "2023-11-04T13:17:19.553Z",
        "__v": 0
    }
]
```

## Questions

### 1. How can I Perform a case-insensitive search in Mongoose?

- aman != Aman (in case sensitive)
- aman == Aman (in case insensitive)
- aman == aMaN (in case insensitive)

```js
// Seaching a user by its username
router.get("/findUser", async function(req, res){

  const user = await userModel.find({userName: "amankumarsinha"})

  res.send(user); 

  // you will get data but if you write the below code, you will not get data as A is written in capital.

  // const user = await userModel.find({userName: "Amankumarsinha"})
})
```

To solve this case sensitive issue, we need to use "regular expression"

#### Regex anchors some examples:
```
^abc matches strings that start with "abc".

xyz$ matches strings that end with "xyz".

^abc$ matches strings that consist of exactly "abc," 
because it anchors both the start^ and end$ of the string.
```

#### Regex Options:

MongoDB allows you to use various regex options:

```
i: Case-insensitive matching.
m: Enables multi-line matching.
s: Allows . to match newlines.
x: Ignores whitespace and allows comments inside the regex pattern.
```

#### Code

```js
// Searching a user by its username
router.get("/findUser", async function(req, res) {
  
  // This make search insensitive and ^ $ seach the exact match.
  let regex = new RegExp("^AmanKumarSinha$", "i");

  const user = await userModel.find({ userName: regex });

  res.send(user);
});
```

---

### 2. How do I find documents where an array field contains all of a set of value.

In simple word, every user in our database have an array named "categories" and you have to find in which user's categories "nodejs" and "react" is available.

```js
router.get("/findUserUsingArray", async function(req, res) {

  const user = await userModel.find({ categories: {$all: ["nodejs, react"]} });

  res.send(user);
});
```

### 3. How do I find documents with a specific date range in Moongoose?
 
```js
router.get("/findUserUsingDate", async function (req, res) {

  let startingDate = new Date('2023-11-02')
  let lastDate = new Date('2023-11-05')

  // $gte (greater than or equal to) and $lte (less than or equal to) operator.
  const user = await userModel.find({dateCreated: {$gte: startingDate, $lte: lastDate}});

  res.send(user);
});
```

### 4. How can I filter documents based on the existence of a field in Moongoose?

You want to find users who have a "username" field in their documents. If a user document has a "username" field, you consider it as a match.

```js
router.get("/isFieldExist", async function (req, res) {

  const user = await userModel.find({userName: {$exists: true}});

  res.send(user);
});
```

### 5. How can  I filter documents based on a specific field's length in Moongoose?

Lets suppose you want to search username which length is less that x letter and greater than y letters.

```js
Find username which length is less than 10 and greater than 3 letter.

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
```
- It uses the $expr operator, which allows you to perform aggregation expressions within the query. In this case, it checks two conditions using the $and operator:

- $gte: [{$strLenCP: '$userName'}, 3] checks if the length of the "userName" is greater than or equal to 3 characters.
- $lte: [{$strLenCP: '$userName'}, 10] checks if the length of the "userName" is less than or equal to 10 characters.

#### This is all about mongodb. Checkout our more branches for more infomation.