const pool = require("../db/pool");
async function addUser(email, password, firstname, lastname) {
  await pool.query("INSERT INTO users (email,password) VALUES ($1,$2)", [
    email,
    password,
  ]);
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const u_id = rows[0].u_id;
  await pool.query(
    "INSERT INTO userDet (u_id,firstname,lastname) VALUES ($1,$2,$3)",
    [u_id, firstname, lastname],
  );
}

module.exports = { addUser };
