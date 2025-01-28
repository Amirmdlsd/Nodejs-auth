const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config")
module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({ res, message: "user already exist", code: 400 });
    }

    // const {email,name,password} = req.body;
    // const newUser = await this.User.create({email,name,password});

    user = new this.User(_.pick(req.body, ["email", "name", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password.toString(), salt);
    await user.save();
    return this.response({
      res,
      message: "user created successfully",
      data: _.pick(req.body, ["id", "email", "name"]),
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        message: "invalid email or password",
        code: 400,
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid){
      return this.response({
        res,
        message: "invalid email or password",
        code: 400,
      });
    }
    const token = await jwt.sign({
      id: user.id},config.get('jwt_key'))
      this.response({
        res,
        message: "user logged in successfully",
        data: {
          token,
          user: _.pick(user, ["id", "email", "name"]),
        },
      })
  }
})();
