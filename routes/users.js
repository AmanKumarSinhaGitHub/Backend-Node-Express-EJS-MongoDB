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