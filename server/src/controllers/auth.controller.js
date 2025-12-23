import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    // 1. Get data from frontend
    const { name, email, password, role } = req.body;

    // 2. Validation: Check if fields are empty
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 3. Validation: Prevent fake roles
    if (!["beginner", "trainer", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be 'beginner' or 'trainer'",
      });
    }
    // 4. Check if user already exists
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(409).json({
        message: "User with email already exists",
      });
    }

    // 5. Create the User
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    // 6. Check if creation failed
    const createdUser = await User.findById(user._id).select("-password");

    // 7. Send Success Response
    return res.status(201).json({
      status: "success",
      data: createdUser,
      message: "User registered successfully! Please log in.",
    });
  } catch (error) {
    console.error("Error in registerUser:", error); // Log for developer
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }
    res.send("logi");
  } catch (error) {
    console.error("Error in registerUser:", error); // Log for developer
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
