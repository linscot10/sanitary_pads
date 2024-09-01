const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    enum: ['Sanitary Pads'],
    default: 'Sanitary Pads'
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  receivedDate: {
    type: Date,
    required: true
  },
  releaseDate: {
    type: Date,
    requires: true
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);

// const inventorySchema = new mongoose.Schema({
//   itemName: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Inventory', inventorySchema);