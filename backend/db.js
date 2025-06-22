import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGO_URL;
// console.log(mongoURL);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");  // Moved inside
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
}

export default connectDB;
