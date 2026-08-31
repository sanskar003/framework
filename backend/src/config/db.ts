import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOBD_URI!)
        console.log("Connected to mongoDb Atlas");
    } catch (error) {
        console.log("error:", error)
        process.exit(1);
    }
}