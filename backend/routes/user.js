// Importation d'Express.
const express = require('express');
const router = express.Router();

// Importation des fonctions de contrôle.
const userCtrl = require('../controllers/user');

// Paramétrage des routes.
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation de user.js.
module.exports = router;