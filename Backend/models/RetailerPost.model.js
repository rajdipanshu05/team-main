import mongoose from 'mongoose';

const retailerPostSchema = new mongoose.Schema(
  {
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
    price: {
      type: Number,
      default: 0, // Free if donation
    },
    isDonated: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["available", "claimed", "sold", "donated"],
      default: "available",
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
    expiryDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: true,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receiver",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RetailerPost", retailerPostSchema);
