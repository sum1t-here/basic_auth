const express = require("express");
const app = express();
const authRouter = require("./router/authRouter.js");
const dbConnect = require("./config/databaseConfig.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URl],
    credentials: true,
  })
);

app.use("/api/auth/", authRouter);

app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server" });
});

module.exports = app;
