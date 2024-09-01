const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
const Distribution = require('../model/Distribution.model')
// const { check } = require('express-validator');
// const { validationResult } = require('express-validator');

const router = express.Router();

// creating user
router.post('/distributions', async (req, res, next) => {
    const { deliveryLocation, distributorId, recipientId,  quantityDistributed,distributionId } = req.body;
    if (!quantityDistributed || !recipientId || !deliveryLocation || !location) {
        return res.status(400).json({ message: 'Quantity, recipient, and delivery location are required' });
    }
    try {
        // dont forget to add location
        const newDistribution = new Distribution({distributionId, deliveryLocation,  distributorId, recipientId, quantityDistributed, });
        await newDistribution.save();
        res.status(201).json(newDistribution);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get All Users
router.get('/distributions', async (req, res, next) => {
    try {
        const distributions = await Distribution.find().populate('distributorId recipientId itemId');
        res.json(distributions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get User by ID
router.get('/distributions/:id', async (req, res, next) => {
    try {
        const distribution = await Distribution.findById(req.params.id).populate('distributorId recipientId itemId');
        if (distribution) {
            res.json(distribution);
        } else {
            res.status(404).json({ message: 'Distribution not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Update User
router.put('/distributions/:id', async (req, res, next) => {
    const { distributorId, recipientId, itemId, quantityDistributed } = req.body;

    try {
        const distribution = await Distribution.findByIdAndUpdate(
            req.params.id,
            { distributorId, recipientId, itemId, quantityDistributed },
            { new: true }
        );

        if (distribution) {
            res.json(distribution);
        } else {
            res.status(404).json({ message: 'Distribution not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// delete User
router.delete('/distributions/:id', async (req, res, next) => {
    try {
        const distribution = await Distribution.findByIdAndDelete(req.params.id);

        if (distribution) {
            res.json({ message: 'Distribution deleted successfully' });
        } else {
            res.status(404).json({ message: 'Distribution not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router