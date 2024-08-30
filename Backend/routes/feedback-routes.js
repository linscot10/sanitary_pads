const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('../model/Feedback.model')
// const { check } = require('express-validator');
// const { validationResult } = require('express-validator');

const router = express.Router();

// creating user
router.post('/feedbacks', async (req, res, next) => {
    const { feedbackId, recipientId, feedbackText, rating } = req.body;

    try {
        const validRecipientId = mongoose.Types.ObjectId(recipientId);
        const newFeedback = new Feedback({ feedbackId, recipientId: validRecipientId, feedbackText, rating });
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get All Users
router.get('/feedbacks', async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find().populate('recipientId');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get User by ID
router.get('/feedbacks/:id', async (req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('recipientId');
        if (feedback) {
            res.json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Update User
router.put('/feedbacks/:id', async (req, res, next) => {
    const { feedbackText, rating } = req.body;

    try {
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { feedbackText, rating },
            { new: true }
        );

        if (feedback) {
            res.json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// delete User
router.delete('/feedbacks/:id', async (req, res, next) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);

        if (feedback) {
            res.json({ message: 'Feedback deleted successfully' });
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router