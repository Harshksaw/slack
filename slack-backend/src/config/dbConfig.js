import mongose from "mongoose";
import { NODE_ENV } from "./serverConfig";



export const connectDB = async () => {
  try {
    if(NODE_ENV !== 'production') {
        await mongose.connect('http://localhost:27017/slackDB');
    }
    else if(NODE_ENV === 'production') {
        await mongose.connect(mongoURI);

    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
