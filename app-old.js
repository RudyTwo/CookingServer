const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//Connect to database
//mongoose.connect('mongodb+srv://Websites:Wrestling@rudycluster.sm08c.azure.mongodb.net/RudyWebsites.Recipes?retryWrites=true&w=majority').catch(err => console.log(err));
//const db = mongoose.connection;

//db.on('close', console.log('Database Error'));
//db.on('close', err => {console.log(err)});

app.get('/Recipes', (req, res) => {
  //Connect to database
  mongoose.connect('mongodb+srv://Websites:Wrestling@rudycluster.sm08c.azure.mongodb.net/RudyWebsites?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  ).catch(err => console.log(err));
  const db = mongoose.connection;
  //Open the database
  db.on('close', err => console.log(err));
  db.once('open', function () {
    console.log('Connected to Database');
    
    const recipeSchema = new mongoose.Schema({
      name: String
    });
    var recipeModel = mongoose.model('Recipe', recipeSchema);
    const recipeCollection = db.collection('Recipes');

    recipeCollection.find().toArray().then(allRecipes => {
      res.send(allRecipes);
    })

    //var allRecipes = recipeCollection.find()
    //res.send('Collection: ' + allRecipes.name + '<br>Model: ' + recipeModel.find().name);
    
    //res.send('Hello World!  From Rudy');
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})