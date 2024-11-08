// models/Application.model.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  numberOfStudents: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  document: {
    type: String,  // URL to the PDF document for verification
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Allocated', 'Disbursed'],
    default: 'Applied'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
