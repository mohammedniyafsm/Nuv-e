import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL as string;

export const connectDB = async (): Promise<void> => {
    if (!mongoUrl) {
        console.log("MONGO_URL NOT FOUND");
    }
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected To Database");
        return
    } catch (error) {
        console.log(error);
        return
    }
}