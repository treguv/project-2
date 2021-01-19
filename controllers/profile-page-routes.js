const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Like } = require('../models');
const withAuth = require('../utils/auth');

// /profile - will redirect you to user profile
router.get('/', withAuth, (req, res) => {
    Post.findAll({ // shows all of users posts 
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_caption',
            'image_url',
            'tags',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]

    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true })); // serialize data
            res.render('profile-page', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router; 