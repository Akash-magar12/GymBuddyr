import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
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

// 🔒 PASSWORD HASHING (Modern Syntax)
// No 'next' parameter needed!
userSchema.pre("save", async function () {
  // 1. If password wasn't changed, just return (exit the function)
  if (!this.isModified("password")) return;

  // 2. Hash the password
  this.password = await bcrypt.hash(this.password, 10);

  // 3. Function ends here, Mongoose automatically saves
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword)  {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
