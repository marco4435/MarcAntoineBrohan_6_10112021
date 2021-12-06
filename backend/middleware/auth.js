/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const jwt = require('jsonwebtoken');              // Permet l'utilisation des token d'authentification.
const dotenv = require('dotenv').config();        // Permet l'utilisation du fichier .env.

/*----------------------------------MIDDLEWARE----------------------------------*/

// EN -- Function verifying user authentication before executing a request. FR -- Fonction vérifiant l'authentification de l'utilisateur avant execution d'une requête.
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];          // Récupération du token de la requête entrante.
        const decodedToken = jwt.verify(token, process.env.PASSWORD_TOKEN);         // Vérification du format du token.
        const userId = decodedToken.userId;                             // Extraction de l'ID utilisateur.
        if(req.body.userId && req.body.userId !== userId){              // Si la demande contient un ID utilisateur, on le compare à celui de la requête entrante.
            throw 'Invalid user ID';                                    // S'ils sont différents, génération d'une erreur.
        }
        else{
            next();                                                     // S'ils sont identiques, la requête est validée.
        }
    }
    catch{
        res.status(403).json({error: new Error('Requête invalide.')});  // 403 : Le serveur a compris la requête, mais refuse de l'exécuter.
    }
};