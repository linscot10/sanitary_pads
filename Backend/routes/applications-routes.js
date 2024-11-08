// routes/application-routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Application = require('../model/applications.model');
const Inventory = require('../model/inventory.model');
const authentication = require('../middlware/authentication');
const User = require('../model/User.model');

// File upload configuration for PDF documents
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/documents'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Pad application route
router.post('/apply', authentication, upload.single('document'), async (req, res) => {
    const { numberOfStudents, location, notes } = req.body;
    const documentPath = req.file ? req.file.path : null;

    try {
        // Check inventory
        const inventory = await Inventory.findOne({ itemId: 'Sanitary Pads' });
        if (!inventory || inventory.quantity <= 0) {
            return res.status(400).json({ message: 'Pads unavailable in inventory' });
        }

        // Create application record
        const application = new Application({
            userId: req.user.id,
            numberOfStudents,
            location,
            document: documentPath,
            notes
        });
        await application.save();

        // Update user profile status to 'Applied'
        await User.findByIdAndUpdate(req.user.id, { applicationStatus: 'Applied' });

        res.status(201).json({ message: 'Application submitted', application });
    } catch (error) {
        console.error('Error processing application', error);
        res.status(500).json({ message: 'Server error', error });
    }
});



// Get user application details
router.get('/application/user', authentication, async (req, res) => {
    try {
        // Retrieve the application(s) associated with the logged-in user
        const applications = await Application.find({ userId: req.user.id });

        // Check if applications exist for the user
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error retrieving applications', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
