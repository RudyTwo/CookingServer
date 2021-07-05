const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

//Connect to database
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
//The collection of Recipes from the database
const recipeCollection = db.collection("Recipes");

app.get("/Recipes", (req, res) => {
	recipeCollection
		.find()
		.toArray()
		.then((allRecipes) => {
			res.send(allRecipes);
		})
		.catch((err) => console.log(err));
});

app.get("/Recipe/:id", (req, res) => {
	recipeCollection
		//.findOne(req.params.id)
		.findOne({ _id: req.params.id })
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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
