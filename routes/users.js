const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myDB")

// Define the user schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

// Plugin Passport Local Mongoose for user authentication
userSchema.plugin(plm);

// Export the user model
module.exports = mongoose.model("user", userSchema);