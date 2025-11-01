import mongoose from "mongoose";
import { NODE_ENV } from "./serverConfig.js";



export const connectDB = async (mongoURI) => {
  try {
    if(NODE_ENV !== 'production') {
        await mongoose.connect('mongodb://localhost:27017/slackDB');
    }
    else if(NODE_ENV === 'production') {
        await mongoose.connect(mongoURI);

    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
