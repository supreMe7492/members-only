const { Router } = require("express");
const { loginValidator, handleValidationError } = require("../lib/validator");
const passport = require("passport");

const login = Router();
login.get("/", (req, res) => {
  res.render("login");
});

login.post(
  "/",
  loginValidator,
  handleValidationError,
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/",
  }),
);

module.exports = login;
