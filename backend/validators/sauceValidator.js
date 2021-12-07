/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const { Validator } = require('node-input-validator');

/*----------------------------------VALIDATOR----------------------------------*/

exports.checkSauceInput = (req, res, next) => {
    let sauceToCheck;
    if(!req.file){                                                        // En l'absence d'image à modifier.
            sauceToCheck = new Validator(req.body, {                      // Vérifier toute la requête.
            name: 'required|minLength:3|string',
            manufacturer: 'required|minLength:3|string',
            description: 'required|minLength:3|string',
            mainPepper: 'required|minLength:3|string',
        });
    }
    else{
            sauceToCheck = new Validator(JSON.parse(req.body.sauce), {    // S'il y a une image à modifier, vérifier uniquement le texte.
            name: 'required|minLength:3|string',
            manufacturer: 'required|minLength:3|string',
            description: 'required|minLength:3|string',
            mainPepper: 'required|minLength:3|string',
        });
    }
    sauceToCheck.check()
        .then((matched) => {
            if(!matched) {                                                // Si le contrôle est négatif, réponse 400 (Syntaxe de la requête érronée).
                res.status(400).json({ error });
            }
            else{
                next();                                                   // Si le contrôle est positif, passage à la prochaine ligne d'instruction.
            }
        });
}