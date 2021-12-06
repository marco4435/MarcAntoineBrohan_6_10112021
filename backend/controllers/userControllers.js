/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const bcrypt = require('bcrypt');               // Permet de crypter un mot de passe et de comparer des mots de passe cryptés.
const jwt = require('jsonwebtoken');            // Permet qu'un utilisateur ne puisse se connecter qu'une seule fois à son compte.
const validatorEmail = require('validator');

// EN -- Middleware & Models & Constant importation. FR -- Importation des Middleware, des Modèles et des constantes.
const passwordSchema = require("../validators/passwordValidator");
const User = require('../models/userModels'); 

/*----------------------------------CONTROLLERS----------------------------------*/

// EN -- User registration function. FR -- Fonction permettant l'enregistrement d'un utilisateur.
exports.signup = (req, res, next) => {
    let emailIsClear = validatorEmail.isEmail(req.body.email);
    let passwordIsClear = passwordSchema.validate(req.body.password);
    if(emailIsClear && passwordIsClear){
        bcrypt.hash(req.body.password, 10)        // Hachage du mot de passe - Salage de 10 répétitions.
        .then(hash => {
            const user = new User({ email: req.body.email, password: hash, });   // Enregistrement des données saisies dans une constante.
            user.save()                           // Enregistrement dans la base de données.
            .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))   // 201 = Requête traitée avec succès et création d'un document.
            .catch(error => res.status(400).json({ error }));                     // 400 = Syntaxe de la requête érronée.
        })
        .catch(error => res.status(500).json({ error }));                         // 500 = Erreur serveur.
    }
    else{
        return res.status(400).json({ error });   // 400 = Syntaxe de la requête érronée.
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
                process.env.PASSWORD_TOKEN,               
                { expiresIn: '24h' }
            )
            });
        })
        .catch(error => res.status(500).json({ error }));  // 500 = Erreur serveur.
    })
    .catch(error => res.status(500).json({ error }));      // 500 = Erreur serveur.
};