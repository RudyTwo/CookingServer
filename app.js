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

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
