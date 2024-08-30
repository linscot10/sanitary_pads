const mongoose=require('mongoose')

const feedbackSchema = new mongoose.Schema({
    feedbackId: { type: String, required: true, unique: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedbackText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    submittedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Feedback', feedbackSchema);
  