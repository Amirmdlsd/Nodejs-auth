const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  registerValidator() {
    return [
      check("email").isEmail().withMessage("email invalid"),
      check("name").not().isEmpty().withMessage("name is required"),
      check("password").not().isEmpty().withMessage("password is required"),
    ];
  }
  loginValidator() {
    return[];
  }
})();
