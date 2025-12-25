const { Router } = require("express");
const { postValidator, handleValidationError } = require("../lib/validator");
const postForm = Router();
const { userPost } = require("../contollers/postController");
postForm.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("postform");
});

postForm.post("/", postValidator, handleValidationError, userPost);

module.exports = postForm;
