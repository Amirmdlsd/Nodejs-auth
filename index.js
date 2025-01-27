const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const router = require("./src/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(config.get("db.address"))
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
