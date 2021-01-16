const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');


// renders homepage.handlebars template
router.get("/", (req, res) => {
  //get data it needs to render posts
  Post.findAll({
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
    console.log(posts);
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  });
});

//render login.handlebars template.
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//render signup.handlebars template,
router.get("/signup", (req, res) => {
  res.render("signup");
});

//render the image test page and added withAuth function 
router.get("/image", withAuth, (req, res) => {
  res.render("image-upload", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
