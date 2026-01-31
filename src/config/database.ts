import mongoose from "mongoose";
import config from "../config";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database_url);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  Database disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ Database error:", error);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection closed due to app termination");
  process.exit(0);
});
