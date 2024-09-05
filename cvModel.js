// models/cvModel.js
import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to a User model if you want to track who uploaded the CV
  }
});

const CV = mongoose.model('CV', cvSchema);

export default CV;
