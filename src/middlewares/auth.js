const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
async function isLogin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(400).json("access-denied");

  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    req.user = await User.findById(decoded.id);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json("invalid token");
  }
}


module.exports = {isLogin};