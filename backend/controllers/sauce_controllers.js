/*----------------------------------REQUIRED----------------------------------*/

// EN -- Node package importation. FR -- Importation des paquets Node.
const fs = require('fs');

// EN -- Models importation. FR -- Importation des Modèles.
const Sauce = require('../models/sauce_models');

/*----------------------------------CONTROLLERS----------------------------------*/

// EN -- Sauce creation function. FR -- Fonction permettant la création d'une sauce.
// POST - Receive : { sauce: String, image: File } - Send : { message: String }
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);  // Mise au format javascript de la requête.
	delete sauceObject._id;							 // Retrait de l'ID de la requête car la base de données va fournir un autre _ID.
	const sauce = new Sauce({
		...sauceObject,    							 // Enregistrement de toutes les données de la requête.
		likes: 0,									 // Réglage des likes et dislikes.
		dislikes: 0,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`  // Obtention de l'URL de l'image.
	});
	sauce.save()     								 // Enregistrement dans la base de données.
		.then(() => res.status(201).json({ message: "Objet enregistré." }))  			// 200 = Requête traitée avec succès et création d'un document.
		.catch((error) => res.status(400).json({ error }));								// 400 = Syntaxe de la requête érronée.
};

// EN -- Appreciation(like/dislike) sauce function. FR -- Fonction permettant l'appréciation(like/dislike) d'une sauce.
exports.likeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			//variables
			let userId = req.body.userId;
			let sauceId = req.params.id;
			let like = req.body.like;
			// Array with the users depending on their choice
			let arrayLikers = sauce.usersLiked;
			let arrayDislikers = sauce.usersDisliked;
			// Return true if the user liked or disliked before, else it return false.
			let userResetLike =!! arrayLikers.find((e) => e === userId );
			let userResetDislike =!! arrayDislikers.find((e) => e === userId );
	        //conditions : 1 = like, -1 = dislike, 0 = change from like of dislike to nothing.
			if(like === 1) {
					Sauce.updateOne( { _id : sauceId }, { $inc: { likes: +1 }, $push: { usersLiked : userId }, } )
						.then(() =>	{ res.status(200).json({ message: "liked successfully!" })})
						.catch((error) => res.status(400).json({ error }));
				}
				
			if(like === -1) {
					Sauce.updateOne( { _id : sauceId }, { $inc: { dislikes: +1 }, $push: { usersDisliked : userId }, } )
						.then(() =>	{ res.status(200).json({ message: "disliked successfully!" })})
						.catch((error) => res.status(400).json({ error }));
			}

			if(like === 0) {
				if(userResetLike) {
						Sauce.updateOne( { _id : sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked : userId } ,} )
						.then(() =>	{ res.status(200).json({ message: "cancel successfully!" })})
						.catch((error) => res.status(400).json({ error }));
				}
				if(userResetDislike) {
					Sauce.updateOne( { _id : sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked : userId }, } )
					.then(() =>	{ res.status(200).json({ message: "cancel successfully!" })})
					.catch((error) => res.status(400).json({ error }));
				}			
			}
	})
	.catch((error) => res.status(400).json({ error }));
}

// EN -- Sauce modification function. FR -- Fonction permettant la modification d'une sauce.
// PUT - Receive : Sauce as JSON or { sauce: String, image: File } - Send : { message: String }
exports.modifySauce = (req, res, next) => {
	const sauceImage = req.file;
	if(sauceImage){                           	// Si la sauce contient une image.
		Sauce.findOne({ _id: req.params.id })	// Alors on recherche dans la base de données de la sauce sélectionnée grâce à son _ID.
		.then((sauce) => {						// Si on a trouvé une sauce dans la base de données.
			sauceObject = { 					// Enregistrement dans un objet des informations de cette sauce.
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }` 
			};
			const imageName = sauce.imageUrl.split("/images/")[1];  							   // Obtention du nom de l'image.
			fs.unlink(`images/${imageName}`, () =>{                								   // Suppression du fichier image.
				Sauce.updateOne( { _id: req.params.id }, { ...sauceObject, _id: req.params.id } )  // Remplacement dans la base de donnée des informations de cette sauce.
				.then(() =>	{ res.status(200).json({ message: "Sauce mise à jour." })})			   // 200 = Requête traitée avec succès.
				.catch((error) => res.status(400).json({ error }))});                              // 400 = Syntaxe de la requête érronée.
			})
		.catch((error) => res.status(500).json({ error }));                                        // 500 = Erreur serveur.
	} 
    else {																						   // Si la sauce ne contient pas d'image.
		Sauce.updateOne( { _id: req.params.id }, { ...req.body, _id: req.params.id } )             // Remplacement dans la base de donnée des informations de cette sauce.
		.then(() =>	{ res.status(200).json({ message: "Sauce mise à jour." })})					   // 200 = Requête traitée avec succès.
		.catch((error) => res.status(400).json({ error }))										   // 400 = Syntaxe de la requête érronée.
	}
};

// EN -- Sauce delete function. FR -- Fonction permettant la suppression d'une sauce.
// DELETE - Receive : - / Send : { message: String }
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })										  		// Recherche dans la base de données de la sauce sélectionnée grâce à son _ID.
		.then((sauce) => {
			const imageName = sauce.imageUrl.split("/images/")[1];				  		// Obtention du nom de l'image.
			fs.unlink(`images/${imageName}`, () => {							  		// Suppression du fichier image.
				Sauce.deleteOne({ _id: req.params.id })							  		// Suppression de la sauce dans la base de données.
					.then(() => res.status(200).json({ message: "Sauce supprimée." }))  // 200 = Requête traitée avec succès.
					.catch((error) => res.status(400).json({ error }));  		  		// 400 = Syntaxe de la requête érronée.
			});
		})
		.catch((error) => res.status(500).json({ error }));					      		// 500 = Erreur serveur.
};

// EN -- All sauces's selection function. FR -- Fonction permettant la sélection de toutes les sauces.
// GET - Receive : - / Send : array of sauces
exports.getAllSauce = (req, res, next) => {
	Sauce.find()  												// Recherche dans la base de données de toutes les sauces.
		.then((sauces) => res.status(200).json(sauces))			// 200 = Requête traitée avec succès.
		.catch((error) => res.status(400).json({ error }));		// 400 = Syntaxe de la requête érronée.
};

// EN -- One sauce selection function. FR -- Fonction permettant la sélection d'une sauce.
// GET - Receive : - / Send : sauce with _ID
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })						// Recherche dans la base de données de la sauce sélectionnée grâce à son _ID.
		.then((sauce) => res.status(200).json(sauce))			// 200 = Requête traitée avec succès.
		.catch((error) => res.status(404).json({ error }));		// 404 = Ressource non trouvée.
};