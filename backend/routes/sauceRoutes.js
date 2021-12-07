/*----------------------------------REQUIRED----------------------------------*/

// EN -- Express importation. FR -- Importation d'Express.
const express = require('express');
const router = express.Router();

// EN -- Middleware & Models importation. FR -- Importation des Middleware et des Modèles.
const sauceCtrl = require('../controllers/sauceControllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const inputValidator = require("../validators/sauceValidator");

/*----------------------------------ROUTE SETTINGS----------------------------------*/

router.post("/", auth, multer, inputValidator.checkSauceInput, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, inputValidator.checkSauceInput, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

module.exports = router;