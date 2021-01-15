const router = require('express').Router();

// renders homepage.handlebars template
router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
})



//render login.handlebars template.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})




//render signup.handlebars template, 
router.get('/signup', (req, res) => {
    res.render('signup');
})




module.exports = router; 