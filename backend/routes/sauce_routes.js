/*----------------------------------REQUIRED----------------------------------*/

// Express importation.
const express = require('express');
const router = express.Router();

// Controllers importation.
const sauceCtrl = require('../controllers/sauce_controllers');

// Middleware importation.
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*----------------------------------ROUTE SETTINGS----------------------------------*/

router.post("/", auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

module.exports = router;