const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// const { check } = require('express-validator');
// const { validationResult } = require('express-validator');

const User = require('../model/User.model');
const authentication = require('../middlware/authentication')


const router = express.Router();


// creating user
router.post('/users', async (req, res, next) => {
    const { username, name, email, password, role } = req.body;

    try {
        const newUser = new User({ username, name, email, password, role });
        await newUser.save();
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/register', async (req, res, next) => {
    const { username, name, email, password, role } = req.body;

    try {
        const newUser = new User({ username, name, email, password, role });
        await newUser.save();
        res.status(201).json(newUser)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ error: 'Invalid email or password' });
//         }
//         const token = user.generateToken();
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Login failed' });
//     }
// });

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await user.comparePassword(password)) {
            const token = user.generateToken();

            // Redirect to admin panel if the user is an admin
            if (user.role === 'Admin') {
                // Send admin-specific data
                return res.status(200).json({
                    message: 'Admin login successful',
                    token,
                    role: user.role,
                    redirectUrl: '/applications'
                });
            }

            // If not Admin, regular user login
            res.status(200).json({
                message: 'User login successful',
                token,
                role: user.role,
                redirectUrl: '/user-dashboard'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
// Get All Users
router.get('/users', async (req, res, next) => {

    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Get User by ID
router.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).json({ message: 'User Not Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// get user profile

router.get('/profile', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

// Update User
router.put('/users/:id', async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, role, updatedAt: Date.now() },
            { new: true }
        );

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// delete User
router.delete('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router;

