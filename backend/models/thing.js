const mongoose = require('mongoose');

// Création d'un schéma.
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// Exportation vers la base de données.
module.exports = mongoose.model('Thing', thingSchema);