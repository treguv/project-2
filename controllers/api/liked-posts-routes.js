const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment, Like } = require("../../models");

// /liked
router.get("/", (req, res) => {
  Like.findAll({
    where: {
      user_id: req.session.user_id, //3, //req.session.user_id, //req.session.user_id, PUT BACK
    },
    attributes: ["id", "user_id", "post_id"],
    include: [
      {
        model: Post,
        attributes: [
          "id",
          "post_caption",
          "image_url",
          "user_id",
          "tags",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((likedPostData) => {
      const likedPosts = likedPostData.map((post) => post.get({ plain: true })); // serialize data
      console.log("this is posts", likedPosts);
      res.render("liked-posts", { likedPosts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
