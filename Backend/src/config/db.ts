import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL;

export const connectDB = async (): Promise<void> => {
    if (!mongoUrl) {
        console.error("❌ MONGODB_URL not found in environment variables");
        process.exit(1);
    }

    try {
        console.log(mongoUrl);
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 10000, // 10s timeout
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
