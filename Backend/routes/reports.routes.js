const express = require('express');
const router = express.Router();
const Distribution = require('../model/Distribution.model')
const Inventory = require('../model/inventory.model');

// Generate a report on distributions
router.get('/reports/distributions', async (req, res) => {
    try {
        // Aggregate distribution data
        const distributions = await Distribution.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$quantity" },
                    totalDistributions: { $count: {} }
                }
            }
        ]);

        res.status(200).json({ report: distributions[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Generate a report on inventory levels
router.get('/reports/inventory', async (req, res) => {
    try {
        // Aggregate inventory data
        const inventory = await Inventory.find();

        res.status(200).json({ report: inventory });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
