import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema(
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
    requestedItems: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ['Pending', 'Accepted', 'Rejected'],
          default: 'Pending',
        },
        donation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'FoodDonation', // Linking requested item to an actual food donation
        },
      },
    ],
  },
  { timestamps: true }
);



export default mongoose.model('Receiver', receiverSchema);
