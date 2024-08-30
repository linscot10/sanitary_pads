const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  receivedDate: { type: Date, required: true },
  releaseDate: { type: Date, requires: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
