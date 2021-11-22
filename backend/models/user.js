// Importation de Mongoose.
const mongoose = require('mongoose');

// Définition du schéma des routes POST signup & login.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Pré-validation des informations renseignées.
const uniqueValidator = require('mongoose-unique-validator');
userSchema.plugin(uniqueValidator);

// Exportation de user.js.
module.exports = mongoose.model('User', userSchema);