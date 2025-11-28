const express = require("express");
const path = require("node:path");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const signUp = require("./routes/signup");
app.use("/", signUp);

app.listen(3000, () => {
  console.log("hell yeah!");
});
