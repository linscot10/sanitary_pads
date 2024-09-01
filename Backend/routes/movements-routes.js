const express = require('express');
const router = express.Router();
const Movements = require('../model/movements.model');

// Log a new movement
router.post('/movements', async (req, res) => {
    try {
        const { distributionId, latitude, longitude } = req.body;

        const newMovement = new Movements({
            distributionId,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        const savedMovement = await newMovement.save();
        res.status(201).json({ movement: savedMovement });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get movements for a specific distribution
router.get('/movements/:distributionId', async (req, res) => {
    try {
        const { distributionId } = req.params;
        const movements = await Movements.find({ distributionId });

        res.status(200).json({ movements });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
