const { Router } = require("express");
const { getPosts } = require("../db/query");
const post = Router();

post.get("/", async (req, res) => {
  const posts = await getPosts();
  res.render("post", { posts: posts });
});

module.exports = post;
