const express = require('express');

const app = express();
app.use(express.json());

// recuper le schema sur lequel on va faire les requetes
const Product = require('./models/modelDB');

// connexion à la base de données
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://clement:roland@cluster0.8vhrmze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {useNewUrlParser: true,
        useUnifiedTopology: true})
        .then(()=>console.log("connecter a la base de données mongo"))
        .catch(()=>console.log("non connecter a la base de données mongo"));

    
// accepter les connexion exterieur pour intérargir avec le serveur front-end
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  

// afficher tous les produits depuis la base de données
app.get('/api/products',(req, res, next) => {
    Product.find()
  .then(products=>res.status(200).json({products}))
  .catch(error=>res.status(400).json({error}));
});
// recuperer les information d'un produit
 app.get('/api/products/:id', (req, res, next) => {
     Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json(product))
      .catch(error => res.status(400).json({ error }));
  });
// enregistrer dans la base de données
app.post('/api/products',(req, res, next) => {
  delete req.body._id;
  const product = new Product({
    ...req.body
  });
  product.save()
  .then(product=>res.status(201).json({product}))
  .catch((error)=>res.status(400).json({error}));
});

// modifier les inforamtions d'un produit
app.put('/api/products/:id',(req, res, next) => {
  Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
  .then(()=>res.status(201).json({message:'Modified!'}))
  .catch(error=>res.status(400).json({error}));
});
// supprimer un produit
app.delete('/api/products/:id',(req,res,next) =>{
    Product.deleteOne({_id: req.params.id})
    .then(()=>res.status(200).json({message:'Deleted!'}))
    .catch(error=>res.status(400).json({error}));
})
module.exports = app;