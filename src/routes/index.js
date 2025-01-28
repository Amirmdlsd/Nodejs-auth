const express = require("express");
const router = express.Router();
const authRouter = require("./auth/index");
const userRouter = require("./user/index");

const { isLogin } = require("../middlewares/auth");

router.use("/auth", authRouter);
router.use("/user", isLogin, userRouter);

module.exports = router;
// 3:06
