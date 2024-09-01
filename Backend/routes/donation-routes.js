const express = require('express');
const router = express.Router();
const Donation = require('../model/donations.model');

// Add a new donation
router.post('/donations', async (req, res) => {
    const { donorName, quantity, deliveryLocation } = req.body;

    if (!donorName || !quantity || !deliveryLocation) {
        return res.status(400).json({ message: 'Donor name, quantity, and delivery location are required' });
    }

    try {
        const newDonation = new Donation({
            donorName,
            quantity,
            deliveryLocation
        });

        await newDonation.save();
        res.status(201).json({ message: 'Donation added successfully', donation: newDonation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all donations
router.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get a specific donation by ID
router.get('/donations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a donation by ID
router.put('/donations/:id', async (req, res) => {
    const { id } = req.params;
    const { donorName, quantity, deliveryLocation } = req.body;

    try {
        const updatedDonation = await Donation.findByIdAndUpdate(id, {
            donorName,
            quantity,
            deliveryLocation
        }, { new: true });

        if (!updatedDonation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Donation updated successfully', donation: updatedDonation });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a donation by ID
router.delete('/donations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDonation = await Donation.findByIdAndDelete(id);

        if (!deletedDonation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
