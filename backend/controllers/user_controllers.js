/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// EN -- Middleware & Models importation. FR -- Importation des Middleware et des Modèles.
const passwordSchema = require("../middleware/password");
const User = require('../models/user_models');

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
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
    else{
        let errorMessage = "Le mot de passe doit comporter au minimum 5 caractères, 1 majuscule, 1 minuscule, 2 chiffres et ne pas comporter d'espace."
        return res.status(400).json({ error: new Error(errorMessage)});
    }
}

// EN -- User connection function. FR -- Fonction permettant la connexion d'un utilisateur.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })                // Recherche dans la base de données d'un email identique à celui de la requête.
        .then(user => {
            if (!user) {                                   // Erreur si aucun email identique n'est trouvé.
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
    bcrypt.compare(req.body.password, user.password)       // Recherche dans la base de données d'un mot de passe identique à celui de la requête.
        .then(valid => {
            if (!valid) {                                  // Erreur si aucun mot de passe identique n'est trouvé.
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({                         // Réponse à la requête contenant l'ID utilisateur et un token.
                userId: user._id,
                token: jwt.sign(
                { userId: user._id },
                'MON TOKEN INTROUVABLE',               
                { expiresIn: '24h' }
            )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};