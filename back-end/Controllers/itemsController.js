const Item = require("../Models/item");

// Créer un nouvel item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire tous les items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire un item par ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un item par ID
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un item par ID
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir le nombre total d'items
exports.getItemCount = async (req, res) => {
  try {
    const count = await Item.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la quantité totale de tous les items
exports.getTotalQuantity = async (req, res) => {
  try {
    const totalQuantity = await Item.aggregate([
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    res.status(200).json({ totalQuantity: totalQuantity[0].total });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
