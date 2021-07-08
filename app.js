const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const db = require("./database");

//Parse the request if it is of type json
app.use(express.json());

//Connect to MongoDB Atlas RudyWebsites.Recipes Database and Collection
db.connectToMongoDB();

//Get All Recipes
app.get("/Recipes", (req, res) => {
	db.recipeModel
		.find({})
		.then((allRecipes) => {
			res.send(allRecipes);
		})
		.catch((err) => console.log(err));
});

//Get Single Recipe by ID
app.get("/Recipe/:id", (req, res) => {
	db.recipeModel
		.findById(req.params.id)
		.then((Recipe) => {
			//If the recipe with the id passed in isn't found then send a 404 error to the browser with a custom message
			if (!Recipe) {
				return res.status(404).send({
					message: "No Recipe could be found with id: " + req.params.id,
				});
			}
			//return the recipe
			return res.send(Recipe);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error while trying to find recipe." + err.message,
			});
		});
});

//Create a new Recipe
app.post("/Recipe", (req, res) => {
	db.recipeModel.create(req.body, (err, Recipe) => {
		if (err) {
			res.status(500).send({
				message: "Error saving the Recipe. " + err,
			});
		}
		//return the recipe that was just saved
		res.send(Recipe);
	});
});

//Delete a Recipe
app.delete("/Recipe/:id", (req, res) => {
	db.recipeModel.findByIdAndDelete(req.params.id, (err, Recipe) => {
		if (err) {
			res.status(500).send({
				message: "Error Deleting Recipe. " + err,
			});
		}
		//return the deleted Recipe
		res.send(Recipe);
	});
});

//Update a Recipe
app.patch("/Recipe/:id", (req, res) => {
	db.recipeModel.findByIdAndUpdate(
		req.params.id,
		req.body, //The body can contain as many or as few fields as desired.  Only the included fields will be updated all others will contain same values as before the update
		{
			new: true, //Returns the updated Recipe instead of original before update
		},
		(err, Recipe) => {
			if (err) {
				res.status(500).send({
					message: "Error updating the recipe." + err,
				});
			}
			//return the updated Recipe
			res.send(Recipe);
		}
	);
});

//Creates the actual server and listens on the port set above
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
