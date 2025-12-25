const { Router } = require("express");
const member = Router();
const { updateMembership } = require("../contollers/userController");
const { waitingCount } = require("../db/pool");

member.get("/", (req, res) => {
  res.render("member");
});

member.post("/", updateMembership);

module.exports = member;
