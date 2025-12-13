const { Router } = require("express");
const post = Router();
post.get("/", (req, res) => {
  res.render("post");
});

module.exports = post;
