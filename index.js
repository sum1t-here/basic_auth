const PORT = process.env.PORT || 5001;

const app = require("./app.js");

app.listen(PORT, () => {
  console.log("server is listening at http://localhost:" + PORT);
});
