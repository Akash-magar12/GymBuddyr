import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // Makes searching by name faster
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevents two users from having the same email
      lowercase: true, // "User@Gmail.com" is saved as "user@gmail.com"
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message
    },
    role: {
      type: String,
      enum: ["beginner", "trainer", "admin"], // RESTRICTS values
      default: "beginner",
    },
    refreshToken: {
      type: String, // We store the "stay logged in" token here later
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt dates
  }
);

export const User = mongoose.model("User", userSchema);
