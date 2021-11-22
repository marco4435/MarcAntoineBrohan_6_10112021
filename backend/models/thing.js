// Importation de Mongoose.
const mongoose = require('mongoose');

// Définition du schéma des routes GET, POST, PUT et DELETE Thing.
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// Exportation vers la base de données.
module.exports = mongoose.model('Thing', thingSchema);