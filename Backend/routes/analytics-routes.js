const express = require('express');
const router = express.Router();
const Distribution = require('../model/Distribution.model');

// Get distribution trends over time
router.get('/analytics/trends', async (req, res) => {
    try {
        const trends = await Distribution.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({ trends });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
