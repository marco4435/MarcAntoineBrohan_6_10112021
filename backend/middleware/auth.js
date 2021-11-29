/*----------------------------------REQUIRED----------------------------------*/

// NPM importation.
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

/*----------------------------------MIDDLEWARE----------------------------------*/

// Fonction vérifiant l'authentification de l'utilisateur avant envoi de la requête.
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];          // Récupération du token de la requête entrante.
        const decodedToken = jwt.verify(token, 'MON TOKEN INTROUVABLE');// Vérification du format du token.
        const userId = decodedToken.userId;                             // Extraction de l'ID utilisateur.
        if(req.body.userId && req.body.userId !== userId){              // Si la demande contient un ID utilisateur, on le compare à celui de la requête entrante.
            throw 'Invalid user ID';                                    // S'ils sont différents, génération d'une erreur.
        }
        else{
            next();                                                     // S'ils sont identiques, la requête est validée.
        }
    }
    catch{
        res.status(401).json({error: new Error('Invalid request!')});   // Si les instructions du try ne peuvent être executées, génération d'une erreur.
    }
};