const express = require('express');
const router = express.Router();
const Inventory = require('../model/inventory.model')
const Allocation = require('../model/Allocation.model');

router.post('/allocations', async (req, res) => {
    const { allocatedTo, numberOfPads, notes } = req.body;
  
    try {
      // Check if inventory has enough pads
      const inventory = await Inventory.findOne({ itemId: 'Sanitary Pads' });
      if (inventory.quantity < numberOfPads) {
        return res.status(400).json({ message: 'Not enough pads in inventory' });
      }
  
      // Create allocation record
      const allocation = new Allocation({
        allocatedTo,
        numberOfPads,
        notes
      });
      await allocation.save();
  
      // Update inventory
      inventory.quantity -= numberOfPads;
      inventory.lastUpdated = Date.now();
      await inventory.save();
  
      res.status(201).json(allocation);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Get all pad allocations
  router.get('/allocations', async (req, res) => {
    try {
      const allocations = await Allocation.find().sort({ dateAllocated: -1 });
      res.json(allocations);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Get current inventory
  router.get('/inventory', async (req, res) => {
    try {
      const inventory = await Inventory.findOne({ itemId: 'Sanitary Pads' });
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Update inventory manually (e.g., adding new stock)
  router.post('/inventory/update', async (req, res) => {
    const { quantity } = req.body;
  
    try {
      let inventory = await Inventory.findOne({ itemId: 'Sanitary Pads' });
      if (!inventory) {
        inventory = new Inventory({
          itemId: 'Sanitary Pads',
          quantity
        });
      } else {
        inventory.quantity += quantity;
      }
  
      inventory.lastUpdated = Date.now();
      await inventory.save();
  
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  module.exports = router;