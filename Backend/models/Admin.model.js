import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String, // 🔧 Fixed typo: `string` ➜ `String`
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Optional: enforce minimum password length
    },
    permission: {
      type: String,
      enum: ["Yes", "No"],
      default: "No", // Optional: define a default
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
