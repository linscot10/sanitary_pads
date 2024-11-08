// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// require('dotenv').config();
// // const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['Admin', 'School Admin', 'Sponsor', 'distributor'],
//         required: true
//     },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },

// },
//     {
//         timestamps: true
//     });

// // hash password

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt)
//     }
//     next();
// });

// // compare pasword

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

// // Generate jwt token
// userSchema.methods.generateToken= function(){
//     return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
// }


// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, default: 'user' },
    role: { type: String, enum: ['User', 'Sponsor', 'Admin'], default: 'User' },
    applicationStatus: {
        type: String,
        enum: ['Not Applied', 'Applied', 'Allocated', 'Disbursed'],
        default: 'Not Applied'
    },
}, { timestamps: true });

// Hash password before saving user document
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Token generation method
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
