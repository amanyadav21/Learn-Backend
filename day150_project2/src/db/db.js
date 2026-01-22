import mongoose from "mongoose";

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("COnnected to Mongodb")
    } catch(err) {
        console.log("Error connecting to MongoDB: ", err)
    }
}

export default connectDB