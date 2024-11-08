// const mongoose = require('mongoose')

// const inventorySchema = new mongoose.Schema({
//   itemId: {
//     type: String,
//     enum: ['Sanitary Pads'],
//     default: 'Sanitary Pads'
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   description: {
//     type: String
//   },
//   receivedDate: {
//     type: Date.now,
//     required: true
//   },
//   releaseDate: {
//     type: Date,now,
//     requires: true
//   }
// });



const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: {
    type: String,
    enum: ['Sanitary Pads'],  // You can extend this enum to allow other items
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
    default: Date.now,  // Automatically set the received date to the current date
    required: true
  },
  releaseDate: {
    type: Date,
    default: function () {
      // Set releaseDate to 30 days after the receivedDate by default
      return new Date(this.receivedDate).setDate(new Date(this.receivedDate).getDate() + 30);
    },
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
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