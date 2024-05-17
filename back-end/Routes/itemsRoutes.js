const express = require('express')
const router = express.Router()
const itemscontroller = require("../Controllers/itemsController")

// Route pour créer un nouvel item
router.post('/creer-item',itemscontroller.createItem);

// Route pour lire tous les items
router.get('/lire-item', itemscontroller.getItems);

// Route pour lire un item par ID
router.get('/lire-item:id', itemscontroller.getItemById);

// Route pour mettre à jour un item par ID
router.put('/update-item-:id', itemscontroller.updateItem);

// Route pour supprimer un item par ID
router.delete('/delete-item-:id', itemscontroller.deleteItem);

// Routes d'Analyse
router.get('/count', itemscontroller.getItemCount);
router.get('/total-quantity', itemscontroller.getTotalQuantity);

module.exports = router;