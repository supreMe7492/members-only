const { addPost } = require("../db/query");

async function userPost(req, res) {
  const u_id = req.user.u_id;
  const postText = req.body.postText;
  addPost(postText, u_id);
  res.redirect("/posts");
}

module.exports = { userPost };
