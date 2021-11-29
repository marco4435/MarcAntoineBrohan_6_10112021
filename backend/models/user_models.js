/*----------------------------------REQUIRED----------------------------------*/

// NPM importation.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*----------------------------------MODELS----------------------------------*/

// Définition du schéma des routes POST signup & login.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Pré-validation des informations renseignées.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);