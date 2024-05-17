// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const itemroutes = require("./Routes/itemsRoutes")


// Configuration de l'application Express
const app = express();
app.use(express.json());

// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/auth_demo');
const db = mongoose.connection;
app.use('/item'.itemroutes)


// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
