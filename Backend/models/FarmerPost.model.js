import mongoose from "mongoose";

const FarmerPostSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
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
      default: 0,
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
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    }
  },
  { timestamps: true }
);

export default mongoose.model("FarmerPost", FarmerPostSchema);
