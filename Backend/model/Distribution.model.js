const mongoose = require('mongoose')

const distributionSchema = new mongoose.Schema({
    distributionId: { type: String, required: true, unique: true },
    distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    quantityDistributed: { type: Number, required: true },
    distributionDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Distribution', distributionSchema);
  