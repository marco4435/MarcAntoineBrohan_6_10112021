/*----------------------------------REQUIRED----------------------------------*/

// NPM importation.
const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Routes importation.
const sauceRoutes = require('./routes/sauce_routes');
const userRoutes = require('./routes/user_routes');

/*----------------------------------CONNECTION----------------------------------*/

// Mongoose connection.
mongoose.connect('mongodb+srv://marco4435:Y9YfpNw1roIIsl43@cluster0.dyfzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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

// Number of request limited to 100 per minute.
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 100 });

/*----------------------------------APP----------------------------------*/

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;