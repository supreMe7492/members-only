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

async function addPost(postText, u_id) {
  await pool.query("INSERT INTO posts (postdetails) VALUES ($1)", [postText]);
  const { rows } = await pool.query(
    "SELECT * FROM posts WHERE postdetails = $1",
    [postText],
  );
  const p_id = rows[0].p_id;
  await pool.query("INSERT INTO user_post (u_id,p_id) VALUES($1,$2)", [
    u_id,
    p_id,
  ]);
}

async function getPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}
module.exports = { addUser, addPost, getPosts };
