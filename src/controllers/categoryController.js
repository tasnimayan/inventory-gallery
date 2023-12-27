const CategoryModel = require('../models/CategoryModel');


exports.createCategory = async (req, res) =>{
	try {
		
    const photo = req.file.path.replace(/\\/g,'/').slice(6)
		const category = await CategoryModel.create({
			categoryName: req.body.categoryName,
			categoryImg: photo,
		});

		if (!category) {
			return res.status(400).send({message:"Unsuccessful"});
		}

		res.status(201).send({message:"Successful", data:category});
	} catch (err) {
		res.status(400).send(err);
	}
}

exports.getAllCategory = async function(req, res) {
	try {
		const category = await CategoryModel.find();

		if (!category) {
			return res.status(404).send({message:"Unsuccessful"});
		}
		res.status(200).send({message:"Successful", data:category});
	} catch (err) {
		res.status(400).send(err);
	}
}