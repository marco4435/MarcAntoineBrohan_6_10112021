/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const express = require('express');               // Charge le framework Express.
const helmet = require('helmet');                 // Défini l'entête HTTP.
const mongoose = require('mongoose');             // Communication avec la base de données.
const path = require('path');                     // Donne accès aux fichiers enregistrés localement.

// EN -- Routes parameters import. FR -- Importation des paramètres des routes.
const sauceRoutes = require('./routes/sauce_routes');
const userRoutes = require('./routes/user_routes');
const key_mongoose = require('./middleware/key_mongoose');

/*----------------------------------CONNECTION----------------------------------*/

// EN -- Mongoose connection. FR -- Connexion à Mongoose.
mongoose.connect(key_mongoose,
    { useNewUrlParser: true,   // Fichier ENV à mettre dans le gitignore.
    useUnifiedTopology: true })
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

/*----------------------------------APP----------------------------------*/

app.use(helmet());
app.use(express.json());                                               // Extrait le corps JSON des requêtes venant du front end.
app.use('/images', express.static(path.join(__dirname, 'images')));    // Enregistrement et renommage des images postées.

// EN -- Route creation. FR -- Création des routes.
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;