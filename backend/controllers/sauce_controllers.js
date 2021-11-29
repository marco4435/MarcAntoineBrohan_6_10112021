/*----------------------------------REQUIRED----------------------------------*/

// NPM importation.
const fs = require('fs');

// Models importation.
const Sauce = require('../models/sauce_models');

/*----------------------------------CONTROLLERS----------------------------------*/

// Create sauce.
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		likes: 0,
		dislikes: 0,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }` });
	sauce.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Like sauce.
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

// Modify sauce.
exports.modifySauce = (req, res, next) => {
	const sauceImage = req.file;
	if(sauceImage){
		Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			sauceObject = { 
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${ req.file.filename }` 
			};
			const imageName = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${imageName}`, () =>{
				Sauce.updateOne( { _id: req.params.id }, { ...sauceObject, _id: req.params.id } )
				.then(() =>	{ res.status(200).json({ message: "Sauce updated successfully!" })})
				.catch((error) => res.status(400).json({ error }))});
			})
		.catch((error) => res.status(500).json({ error }));
	} 
    else {
		Sauce.updateOne( { _id: req.params.id }, { ...req.body, _id: req.params.id } )
		.then(() =>	{ res.status(200).json({ message: "Sauce updated successfully!" })})
		.catch((error) => res.status(400).json({ error }))
	}
};

// Delete sauce.
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const imageName = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${imageName}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Deleted!" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// Get all sauce.
exports.getAllSauce = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error }));
};

// Get one sauce.
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};