const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true
    },
    donationType: {
        type: String,
        enum: ['Sanitary Pads'],
        default: 'Sanitary Pads'
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryLocation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donation', donationSchema);
