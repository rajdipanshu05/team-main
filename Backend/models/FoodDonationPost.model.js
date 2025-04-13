import mongoose from 'mongoose';

const foodDonationPostSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Change to 'Admin' or relevant model if needed
      required: true,
    },
    product: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    donationDate: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isFree: {
      type: Boolean,
      default: true, // Donations are free
    },
    status: {
      type: String,
      enum: ['available', 'claimed', 'expired'],
      default: 'available',
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receiver',
      default: null,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('FoodDonationPost', foodDonationPostSchema);
