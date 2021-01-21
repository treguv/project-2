const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Like } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        // shows all of users posts
        where: {
            user_id: req.session.user_id,
        },
        attributes: ["id", "post_caption", "image_url", "tags", "created_at"],
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
    })
        .then((postData) => {
            //Need to get the user profile photo url
            User.findOne({
                where: {
                    id: req.session.user_id,
                },
                attributes: ["profile_photo"],
            }).then((dbUserData) => {
                //callback inside the user
                const posts = postData.map((post) => post.get({ plain: true })); // serialize data
                const username = req.session.username;
                const strippedUserData = dbUserData.get({ plain: true });
                console.log(strippedUserData.profile_photo);
                res.render("profile-page", {
                    posts,
                    username,
                    loggedIn: true,
                    user_id: req.session.user_id,
                    profile_photo: strippedUserData.profile_photo,
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
