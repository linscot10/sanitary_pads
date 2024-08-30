const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('../model/inventory.model');
const { findById, findByIdAndUpdate } = require('../model/User.model');
// const { check } = require('express-validator');
// const { validationResult } = require('express-validator');

const router = express.Router();

// creating user
router.post('/inventory', async (req, res, next) => {
    const { itemId, name, quantity, description, receivedDate, releaseDate } = req.body;
    try {
        const newItem = new Inventory({ itemId, name, quantity, description, receivedDate, releaseDate })
        await newItem.save();
        res.status(201).json(newItem)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// Get All Users
router.get('/inventory', async (req, res, next) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get User by ID
router.get('/inventory/:id', async (req, res, next) => {
    try {
        const item = await findById(req.params.id);
        if (item) {
            res.json(item)

        }
        else {
            res.status(404).json({ message: 'Item Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Update User
router.put('/inventory/:id', async (req, res, next) => {
    const { itemId, name, quantity, description, receivedDate, releaseDate } = req.body;
    try {
        const item = await findByIdAndUpdate(req.params.id,
            { itemId, name, quantity, description, receivedDate, releaseDate },
            { new: true }
        );
        if (item) {
            res.json(item)

        }
        else {
            res.status(404).json({ message: 'Item Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// delete User
router.delete('/inventory/:id', async (req, res, next) => {
    try {
        const item = await findByIdAndUpdate(req.params.id);
        if (item) {
            res.json({ message: 'item deleted successfully' })

        }
        else {
            res.status(404).json('Item Not Found')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;