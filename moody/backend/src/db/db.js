import mongoose from "mongoose";

export default function connectToDB() {
    return mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connect to DB");
        })
        .catch((err) => {
            console.error("DB connection failed", err);
            throw err;
        });
}