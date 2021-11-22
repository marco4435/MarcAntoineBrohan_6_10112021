// Importation de multer.
const multer = require('multer');

// Bibliothèque de mime_types.
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Paramétrage du stockage du fichier importé.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {                   // Paramétrage du lieu de stockage.
        callback(null, 'images');
    },
    filename: (req, file, callback) => {                      // Paramétrage du nom du fichier.
        const name = file.originalname.split(' ').join('_');  // Modification du nom du fichier.
        const extension = MIME_TYPES[file.mimetype];          // Modification de l'extensiondu du fichier.
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Exportation des fichiers image.
module.exports = multer({storage: storage}).single('image');