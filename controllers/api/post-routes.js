const router = require("express").Router();
const { Post, User, Like, Comment } = require("../../models");
const sequelize = require("../../config/connection");
// const withAuth = require('../../utils/auth');

//find all post
router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_caption",
      "created_at",
      "image_url",
      "tags",
      // literal SQL query to return post likes
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//find one post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "post_caption",
      "created_at",
      "image_url",
      //literal SQL query to return count of likes post has
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "post_id",
          "user_id",
          "created_at",
          "tags",
        ],
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
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// expects ~ post_caption, user_id ,image_url *****
router.post("/", (req, res) => {
  Post.create({
    post_caption: req.body.post_caption,
    user_id: req.body.user_id,
    image_url: req.body.image_url,
    tags: req.body.tags,
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// MUST BE BEFORE OTHER PUT ROUTES (will create error otherwise)
router.put("/like", (req, res) => {
  Like.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  }).then(() => {
    return Post.findOne({
      // finds post user liked
      where: {
        id: req.body.post_id,
      },
      attributes: [
        "id",
        "post_caption",
        "created_at",

        // literal SQL query to return count of likes post has
      ],
    })
      .then((postData) => res.json(postData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
});

//update post route
router.put("/:id", (req, res) => {
  Post.update(
    {
      post_caption: req.body.post_caption,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete post route
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//render the view of a single post
router.get("/viewpost/:id", (req, res) => {
  //expects  the id of the post to render
  Post.findOne({
    where: {
      id: req.params.id,
    },
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
    // console.log(dbPostData);
    const post = dbPostData.get({ plain: true }); // serialize all the posts
    console.log(post);
    res.render("single-post", {
      post,
    });
  });
});

//Search for a given post
router.get("/search/:query", (req, res) => {
  Post.findAll({
    where: {
      tags: req.params.query,
    },
  }).then((dbPostData) => {
    console.log("request recieved");
    // console.log(dbPostData.get({ plain: true }));
    const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
    console.log("found posts", posts);
    res.render("search-posts", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  });
});
module.exports = router;
