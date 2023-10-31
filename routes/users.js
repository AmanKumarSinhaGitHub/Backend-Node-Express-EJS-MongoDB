const mongoose = require("mongoose")

// Connect to local host mongodb server 
mongoose.connect("mongodb://127.0.0.1:27017/amazonDB")
// The above line create a database in mongodb named "amazonDB"

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})

module.exports = mongoose.model("userDB", userSchema)