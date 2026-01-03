import mongoose from "mongoose";

function connectTodb() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("✅ Connected to DB successfully")
    })
    .catch((err) => {
        console.log("❌ Not connected to DB Failed", err.message)
    })
}

export default connectTodb