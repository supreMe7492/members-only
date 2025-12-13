const { Router } = require("express");
const postForm = Router();
const { userPost } = require("../contollers/postController");
postForm.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("postform");
});

postForm.post("/", userPost);

module.exports = postForm;
