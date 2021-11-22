const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Importation puis connection à Mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://marco4435:Y9YfpNw1roIIsl43@cluster0.dyfzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// CORS - Cross Origin Resource Sharing - Configuration des routes.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Importation des routes.
app.use(bodyParser.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Exportation de app.js.
module.exports = app;