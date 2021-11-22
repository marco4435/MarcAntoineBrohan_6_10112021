const express = require('express');
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

// Création d'un routeur.
const router = express.Router();

// Configuration de routes get, post, put, delete.
router.get('/:id', auth, stuffCtrl.getAllThings)
router.get('/:id', auth, stuffCtrl.getOneThing)
router.post('/', auth, stuffCtrl.createThing)
router.put('/:id', auth, stuffCtrl.modifyThing)
router.delete('/:id', auth, stuffCtrl.deleteThing)

// Exportation de stuff.js.
module.exports = router;