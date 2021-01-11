const router = require('express').Router();
const { Post, User, Like } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_caption', 'created_at', [
            // literal SQL query to return post likes
        ]
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// router.get('/:id', (req, res) => {

// }); 

// expects ~ post_caption, user_id
router.post('/', (req, res) => {
    Post.create({
        post_caption: req.body.post_caption,
        user_id: req.body.user_id
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// MUST BE BEFORE OTHER PUT ROUTES (will create error otherwise)
router.put('/like', (req, res) => {
    Like.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(() => {
            return Post.findOne({ // finds post user liked 
                where: {
                    id: req.body.post_id
                },
                attributes: ['id', 'post_caption', 'created_at',
                    [
                        // literal SQL query to return count of likes post has
                    ]
                ]
            })
                .then(postData => res.json(postData))
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        })
});

// router.put('/:id', (req, res) => {

// })


// router.delete('/:id', (req, res) => {

// })

module.exports = router; 