/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// EN -- Middleware & Models & Constant importation. FR -- Importation des Middleware, des Modèles et des constantes.
const passwordSchema = require("../middleware/password");
const User = require('../models/user_models');
const token_password = require('../hidden');

/*----------------------------------CONTROLLERS----------------------------------*/

// EN -- User registration function. FR -- Fonction permettant l'enregistrement d'un utilisateur.
exports.signup = (req, res, next) => {
    let passwordIsClear = passwordSchema.validate(req.body.password);
    if(passwordIsClear){
        bcrypt.hash(req.body.password, 10)   // Hachage du mot de passe - Salage de 10 répétitions.
        .then(hash => {
            const user = new User({          // Enregistrement des données saisies dans une constante.
                email: req.body.email,
                password: hash
        });
        user.save()                          // Enregistrement dans la base de données.
            .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))   // 201 = Requête traitée avec succès et création d'un document.
            .catch(error => res.status(400).json({ error }));                     // 400 = Syntaxe de la requête érronée.
        })
        .catch(error => res.status(500).json({ error }));                         // 500 = Erreur serveur.
    }
    else{
        let errorMessage = "Le mot de passe doit comporter au minimum 5 caractères, 1 majuscule, 1 minuscule, 2 chiffres et ne pas comporter d'espace."
        return res.status(400).json({ error: new Error(errorMessage)});   // 400 = Syntaxe de la requête érronée.
    }
}

// EN -- User connection function. FR -- Fonction permettant la connexion d'un utilisateur.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })                // Recherche dans la base de données d'un email identique à celui de la requête.
        .then(user => {
            if (!user) {                                   // Erreur si aucun email identique n'est trouvé.
                return res.status(401).json({ error: 'Utilisateur non trouvé.' });   // Une authentification est nécessaire pour accéder à la ressource.
            }
    bcrypt.compare(req.body.password, user.password)       // Recherche dans la base de données d'un mot de passe identique à celui de la requête.
        .then(valid => {
            if (!valid) {                                  // Erreur si aucun mot de passe identique n'est trouvé.
                return res.status(401).json({ error: 'Mot de passe incorrect.' });   // Une authentification est nécessaire pour accéder à la ressource.
            }
            res.status(200).json({                         // Réponse à la requête contenant l'ID utilisateur et un token.
                userId: user._id,
                token: jwt.sign(
                { userId: user._id },
                token_password,               
                { expiresIn: '24h' }
            )
            });
        })
        .catch(error => res.status(500).json({ error }));  // 500 = Erreur serveur.
    })
    .catch(error => res.status(500).json({ error }));      // 500 = Erreur serveur.
};