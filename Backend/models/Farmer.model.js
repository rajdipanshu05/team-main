import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
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
    address: {
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
    crops: [
      {
        cropName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        harvestDate: {
          type: Date,
          required: true,
        },
        price: {
          type: Number,
          default: 0, // Price = 0 means it's a donation
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
        claimedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Receiver",
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);
