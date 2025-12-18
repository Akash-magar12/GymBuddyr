import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config();

const startServer = async () => {
  try {
    // 1. Connect to Database FIRST
    await connectDB();

    // 2. Define Port
    const PORT = process.env.PORT || 8000;

    // 3. Handle specific Express runtime errors
    app.on("error", (error) => {
      console.log("Express Error:", error);
      throw error;
    });

    // 4. Start listening only after DB is ready
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running on port ${PORT}`);
    });
  } catch (error) {
    // 5. If DB fails, stop everything. Don't let the server hang.
    console.log("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();
