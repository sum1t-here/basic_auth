const express = require("express");
const app = express();
const authRouter = require("./router/authRouter.js");
const dbConnect = require("./config/databaseConfig.js");

dbConnect();

app.use(express.json());
app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server" });
});

module.exports = app;
