const { addUser, makeMember } = require("../db/query");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function signUser(req, res) {
  const email = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  await addUser(email, password, firstname, lastname);
  res.send("user added succesfylly");
}

async function updateMembership(req, res) {
  const u_id = req.user.u_id;
  const hashed = await bcrypt.hash(process.env.MEMBERSHIP_CODE, 10);
  const isValid = await bcrypt.compare(req.body.membercode, hashed);
  if (!isValid) {
    res.redirect("/posts");
    return;
  }
  await makeMember(u_id);
  res.send("you are now member");
}

module.exports = { signUser, updateMembership };
