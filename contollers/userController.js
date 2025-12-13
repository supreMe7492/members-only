const { addUser } = require("../db/query");
const bcrypt = require("bcryptjs");
async function signUser(req, res) {
  const email = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  await addUser(email, password, firstname, lastname);
  res.send("user added succesfylly");
}

module.exports = { signUser };
