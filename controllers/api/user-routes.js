const router = require('express').Router(); 
const { User } = require('../../models'); 

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    })
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] }, 
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: "Hey no user with this id"}); 
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        username: req.body.username, 
        password: req.body.password
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

// make sure to pass in req.body in put routes
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'Hey sorry mate! No user found with this id!!'}); 
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: "Sorry dummy... seems like there's no user with this id :/"}); 
            return;
        }
        res.json(userData); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    })
});


module.exports = router; 