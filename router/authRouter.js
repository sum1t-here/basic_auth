const express = require("express");

const { signup, signin, getUser } = require("../controller/authController.js");

const jwtAuth = require("../middleware/jwtAuth.js");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/user", jwtAuth, getUser);

module.exports = authRouter;
