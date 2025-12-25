const { Router } = require("express");
const { getPosts, isMember } = require("../db/query");

const post = Router();

post.get("/", async (req, res) => {
  const posts = await getPosts();
  const isMem = await isMember(req.user.u_id);
  res.render("post", { posts: posts, isMember: isMem });
});

post.post("/", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // passes error to app.use error handler

    req.session.destroy((err) => {
      if (err) console.error("Error destroying session:", err);

      res.clearCookie("connect.sid", { path: "/" });
      res.redirect("/");
    });
  });
});

module.exports = post;
