const express = require("express");
const mongoose = require("mongoose");

//Connect to database
exports.connectToMongoDB = () => {
	mongoose
		.connect(
			"mongodb+srv://Websites:Wrestling@rudycluster.sm08c.azure.mongodb.net/RudyWebsites?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
			}
		)
		.catch((err) => console.log(err));
	const db = mongoose.connection;
	//Open the database
	db.on("close", (err) => console.log(err));
	db.once("open", () => console.log("Connected to Database"));
};

//Create a schema for the Recipes Collection
exports.recipeSchema = new mongoose.Schema({
	name: String,
	description: String,
	instructions: String,
	image: String,
	ingredients: Array,
});
exports.recipeModel = mongoose.model("Recipe", this.recipeSchema, "Recipes");
