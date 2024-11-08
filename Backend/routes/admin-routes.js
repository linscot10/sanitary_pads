// routes/admin-routes.js
const express = require('express');
const router = express.Router();
const Application = require('../model/applications.model');
const User = require('../model/User.model');
const Inventory = require('../model/inventory.model');
const authentication = require('../middlware/authentication');
const authorization = require('../middlware/authorization'); // Middleware to check admin access

// Middleware to ensure admin access
router.use(authentication, authorization('Admin'));

// View all applications
router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find().populate('userId', 'username email');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
});

// Allocate sanitary pads to a user application
router.post('/applications/:id/allocate', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        const inventory = await Inventory.findOne({ itemId: 'Sanitary Pads' });

        if (!inventory || inventory.quantity <= 0) {
            return res.status(400).json({ message: 'Insufficient inventory' });
        }

        // Update application status and user applicationStatus
        application.status = 'Allocated';
        await application.save();

        await User.findByIdAndUpdate(application.userId, { applicationStatus: 'Allocated' });
        inventory.quantity -= application.numberOfStudents;
        await inventory.save();

        res.status(200).json({ message: 'Pads allocated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error allocating pads', error });
    }
});

// View a specific user's applications
router.get('/applications/user/:userId', async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.params.userId });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user applications', error });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Add a new user (Admin-only)
router.post('/users', async (req, res) => {
    try {
        const { username, name, email, password, role } = req.body;
        const newUser = new User({ username, name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error });
    }
});

module.exports = router;
