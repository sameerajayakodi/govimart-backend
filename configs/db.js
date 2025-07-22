import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    mongoose.connection.on("connected", () =>
      console.log("✅ Database Connected")
    );

    mongoose.connection.on("error", (err) =>
      console.error("❌ MongoDB connection error:", err)
    );

    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
  }
};

export default connectDB;
