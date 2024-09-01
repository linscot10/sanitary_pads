const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
const Inventory = require('../model/inventory.model');
const { findById, findByIdAndUpdate } = require('../model/User.model');
// const { check } = require('express-validator');
// const { validationResult } = require('express-validator');

const router = express.Router();

// creating user
router.post('/inventory/add', async (req, res, next) => {
    const { itemId, name, quantity, description, receivedDate, releaseDate } = req.body;
    try {
        let newItem = await Inventory.findOne({ itemId });
        if (!newItem) {
            // If item does not exist in inventory, create it
            newItem == new Inventory({ itemId, name, quantity, description, receivedDate, releaseDate })
        } else {
            // If item exists, update quantity
            newItem.quantity += quantity;
        }

        newItem.lastUpdated = Date.now();
        await newItem.save();
        res.status(201).json(newItem)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// Reduce stock (e.g., when pads are distributed)
router.post('/inventory/reduce', async (req, res) => {
    const { itemId, quantity } = req.body;
  
    try {
      const inventory = await Inventory.findOne({ itemId });
      if (!inventory) {
        return res.status(404).json({ message: 'Item not found in inventory' });
      }
  
      if (inventory.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
  
      inventory.quantity -= quantity;
      inventory.lastUpdated = Date.now();
      await inventory.save();
  
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

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