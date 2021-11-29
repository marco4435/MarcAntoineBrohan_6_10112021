/*----------------------------------REQUIRED----------------------------------*/

// Express importation.
const express = require('express');
const router = express.Router();

// Controllers importation.
const userCtrl = require('../controllers/user_controllers');

// Middleware importation.
const password = require('../middleware/password');

/*----------------------------------ROUTE SETTINGS----------------------------------*/

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;