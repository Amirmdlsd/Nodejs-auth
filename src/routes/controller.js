const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const User = require("../models/user");
module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
  }

  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const error = result.array();
      const message = [];
      error.forEach((e) => {
        message.push(e.msg);
      });
      res.status(500).json({
        data: message,
        message: "validation error",
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }

  response({res,message,code=200,data={}}){
    res.status(code).json({
      message,
      data
    });
  }
};
