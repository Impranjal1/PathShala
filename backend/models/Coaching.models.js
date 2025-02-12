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
  address: String,
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
  subjects: [String],
  fees: Number,
  photos: [String],
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  hasRegistrationPaid: {
    type: Boolean,
    default: false
  }
});

coachingSchema.index({ location: '2dsphere' });
export const Coaching = mongoose.model('Coaching', coachingSchema);