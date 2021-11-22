// Importation du schéma thing.
const Thing = require('../models/thing');

// Fonction getAllThing permettant l'importation de tous les articles.
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

// Fonction getOneThing permettant l'importation d'un article.
exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

// Fonction createThing permettant la création d'un article.
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing); // Convertion en object javascript du contenu de la requête.
    delete thingObject._id;                         // Retrait de l'ID.
    const thing = new Thing({                       // Retrait de l'ID.
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Obtention de l'url de l'image.
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// Fonction createThing permettant la modification d'un article.
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

// Fonction createThing permettant la suppression d'un article.
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};