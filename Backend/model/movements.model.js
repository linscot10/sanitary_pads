const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    distributionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distribution',
        required: true
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

movementSchema.index({ location: '2dsphere' }); // Index for geospatial queries

module.exports = mongoose.model('Movement', movementSchema);
