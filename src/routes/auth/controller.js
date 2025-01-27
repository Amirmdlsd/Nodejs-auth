const controller = require("../controller");
module.exports = new (class extends controller {
  async register(req, res) {
    res.send("Register a new user");
  }

  async login(req, res) {
    res.send("Login user");
  }
})();
