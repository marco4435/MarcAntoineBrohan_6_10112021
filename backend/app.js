/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const express = require('express');               // Charge le framework Express.
const helmet = require('helmet');                 // Défini l'entête HTTP.
const mongoose = require('mongoose');             // Communication avec la base de données.
const path = require('path');                     // Donne accès aux fichiers enregistrés localement.
const rateLimit = require('express-rate-limit');  // Donne accès aux fichiers enregistrés localement.
const dotenv = require('dotenv').config();        // Permet l'utilisation du fichier .env.

// EN -- Routes parameters import. FR -- Importation des paramètres des routes.
const sauceRoutes = require('./routes/sauceRoutes');
const userRoutes = require('./routes/userRoutes');

/*----------------------------------CONNECTION----------------------------------*/

// EN -- Mongoose connection. FR -- Connexion à Mongoose.
mongoose.connect(process.env.KEYMONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// EN -- Limit each IP adress to 100 request per minute. FR -- Limite chaque adresse IP à 100 requêtes par minute.
const limiter = rateLimit({windowMs: 1 * 60 * 1000, max: 60});        
                                
/*----------------------------------APP----------------------------------*/

app.use(helmet());
app.use(limiter);
app.use(express.json());                                               // Extrait le corps JSON des requêtes venant du front end.
app.use('/images', express.static(path.join(__dirname, 'images')));    // Enregistrement et changement de nom des images postées.

// EN -- Route creation. FR -- Création des routes.
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;