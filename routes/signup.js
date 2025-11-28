const { Router } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const signUp = Router();
signUp.get("/", (req, res) => {
  res.render("index");
});

signUp.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const { rows } = await pool.query("SELECT * FROM users");
  console.log(rows);
  await pool.query("INSERT INTO users (email,password) VALUES ($1,$2)", [
    req.body.username,
    hashedPassword,
  ]);
  res.send("user added");
});

module.exports = signUp;
