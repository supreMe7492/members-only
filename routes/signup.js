const { Router } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { signUser } = require("../contollers/userController");
const signUp = Router();
signUp.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/posts");
  } else {
    res.render("index");
  }
});

signUp.post("/", signUser);

module.exports = signUp;
