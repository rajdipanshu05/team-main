import mongoose from 'mongoose';

const FoodDonationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    product: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    donationDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receiver', // Tracks which receiver is claiming the donation
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
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isFree: {
      type: Boolean,
      default: true, // Donations are free
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receiver', // This links to the receiver model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('FoodDonation', FoodDonationSchema);
