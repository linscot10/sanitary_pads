const mongoose = require('mongoose');
const User = require('../model/User.model'); // Adjust the path to your User model
const bcrypt = require('bcryptjs');

const seedAdminUser = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sanitary_pads', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("1234567890", 10);
            const admin = new User({
                username: 'adminUser',
                name: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'Admin'
            });
            await admin.save();
            console.log('Admin user created');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedAdminUser();
