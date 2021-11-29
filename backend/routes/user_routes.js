/*----------------------------------REQUIRED----------------------------------*/

// EN -- Express importation. FR -- Importation d'Express.
const express = require('express');
const router = express.Router();

// EN -- Controllers importation. FR -- Importation des fonctions de contrôle.
const userCtrl = require('../controllers/user_controllers');

/*----------------------------------ROUTE SETTINGS----------------------------------*/

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;