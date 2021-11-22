// Importation d'Express.
const express = require('express');
const app = express();

// Importation des routes.
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// CORS - Paramétrage des routes.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Connection à Mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://marco4435:Y9YfpNw1roIIsl43@cluster0.dyfzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Exportation de app.js.
module.exports = app;