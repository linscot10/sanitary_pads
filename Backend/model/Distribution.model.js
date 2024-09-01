const mongoose = require('mongoose')

const distributionSchema = new mongoose.Schema({
  distributionId: {
    type: String,
    required: true,
    unique: true
  },
  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: String,
    enum: ['Sanitary Pads'],
    default: 'Sanitary Pads'
  },
  quantityDistributed: {
    type: Number,
    required: true
  },
  distributionDate: {
    type: Date,
    default: Date.now
  },
  deliveryLocation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
}
});

module.exports = mongoose.model('Distribution', distributionSchema);

