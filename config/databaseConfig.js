const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = () => {
  mongoose
    .connect(MONGODB_URI)
    .then((conn) => console.log("Connected to DB " + conn.connection.host))
    .catch((err) => console.log(err.message));
};

module.exports = dbConnect;
