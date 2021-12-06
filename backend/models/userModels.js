/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*----------------------------------MODELS----------------------------------*/

// EN -- Definition of the POST signup and login route schema. FR -- Définition du schéma des routes POST signup et login.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// EN -- Provided information pre-validation. FR -- Pré-validation des informations renseignées.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);