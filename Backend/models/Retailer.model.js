import mongoose from 'mongoose';

const RetailerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Clean up any leading/trailing spaces
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Ensures the email is always stored in lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
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
    inventory: [
      {
        product: {
          type: String,
          required: true,
          trim: true, // Clean up product names
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          default: 0, // Price can be 0 if it's a donation
        },
        isDonated: {
          type: Boolean,
          default: false, // Indicates if the item is donated (otherwise for sale)
        },
        status: {
          type: String,
          enum: ["available", "claimed", "sold", "donated"],
          default: "available", // Default status for the item
        },
        claimedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Receiver", // Reference to the receiver claiming the item
          default: null, // Initially not claimed
        },
      },
    ],
  },
  { timestamps: true }
);



export default mongoose.model('Retailer', RetailerSchema);
