const { Router } = require("express");
const passport = require("passport");

const login = Router();
login.get("/", (req, res) => {
  res.render("login");
});

login.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/",
  }),
);

module.exports = login;
