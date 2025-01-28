const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");



const userScehma = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
userScehma.plugin(timeStamp);
const User = mongoose.model("User", userScehma);


module.exports = User;