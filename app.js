const express = require('express');

const app = express();
app.use(express.json());
// connexion à la base de données
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://clement:roland@cluster0.8vhrmze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {useNewUrlParser: true,
        useUnifiedTopology: true})
        .then(()=>console.log("connecter a la base de données mongo"))
        .cath(()=>console.log("non connecter a la base de données mongo"));

    
// accepter les connexion exterieur pour intérargir avec le serveur front-end
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;