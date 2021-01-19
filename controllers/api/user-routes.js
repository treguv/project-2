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
            if (!userData) {
                res.status(404).json({ message: "Hey no user with this id" });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


//login route
router.post('/login', (req, res) => {
    console.log(req.body)

    User.findOne({
        where: {
            email: req.body.email
        }

    }).then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user with that email address!!' });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            //declare session variables
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: " You are now logged in!" });
        });

    });
});

//logout route  
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
            console.log(req.session)
        });
    }
    else {
        res.status(404).end();
    }

});


//create user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userExists = Boolean(
            await User.findOne({
                where: { username }
            })
        )
        if (userExists) {
            res.status(409).json({ message: " Username already exists!" });
            return;
        }
        const user = await User.create({ username, email, password })
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.status(201).json(user);
        })
    } catch (err) {
        res.status(500).send({
            message: "you are not logged in"
        })
    }
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
                res.status(404).json({ message: 'Hey sorry mate! No user found with this id!!' });
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
                res.status(404).json({ message: "Sorry mate!... seems like there's no user with this id :/" });
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