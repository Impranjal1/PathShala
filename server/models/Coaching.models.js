import mongoose from "mongoose";

const coachingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    photos: [String],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: String,
    subjects: [String],
    fees: Number,
    hasRegistrationPaid: {
      type: Boolean,
      default: false
    }
  });
  
  coachingSchema.index({ location: '2dsphere' });
  module.exports = mongoose.model('Coaching', coachingSchema);