const router = require('express').Router(); 

// renders homepage.handlebars template
router.get('/', (req, res) => {
    res.render('homepage'); 
})

module.exports = router; 