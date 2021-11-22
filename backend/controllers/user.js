// Importation de BCRYPT et JWT.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importation du schéma user.
const User = require('../models/user');

// Fonction signup permettant la création d'un nouvel utilisateur.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)   // Hachage du mot de passe - Salage de 10 répétitions.
        .then(hash => {
        const user = new User({          // Enregistrement des données saisies dans une constante.
            email: req.body.email,
            password: hash
        });
        user.save()                      // Enregistrement dans la base de données.
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction login permettant la connexion d'un utilisateur.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })                // Recherche dans la base de données d'un email identique à celui de la requête.
        .then(user => {
        if (!user) {           
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)   // Recherche dans la base de données d'un mot de passe identique à celui de la requête.
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({                     // Réponse à la requête.
                    userId: user._id,
                    token: jwt.sign(                       // Génération d'un token.
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};