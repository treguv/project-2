const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepage-routes');
const profilePageRoutes = require('./profile-page-routes'); 

router.use('/api', apiRoutes);
router.use('/', homepageRoutes);
router.use('/profile', profilePageRoutes); 


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;