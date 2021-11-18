// Importation d'express, appel puis exportation de la méthode express.
const express = require('express');
const app = express();
module.exports = app;

// Importation puis connection à Mongoose.
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://marco4435:Y9YfpNw1roIIsl43@cluster0.dyfzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));