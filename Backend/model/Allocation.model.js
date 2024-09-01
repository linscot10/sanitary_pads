
const mongoose = require('mongoose');

const AllocationSchema = new mongoose.Schema({
  allocatedTo: {
    type: String,
    required: true
  },
  numberOfPads: {
    type: Number,
    required: true
  },
  dateAllocated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Allocation', AllocationSchema);