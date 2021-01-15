const router = require('express').Router(); 
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models'); 

// /profile - will redirect you to user profile
router.get('/', (req, res) => {
    res.render('profile-page', { loggedIn: true }); 
})


module.exports = router; 