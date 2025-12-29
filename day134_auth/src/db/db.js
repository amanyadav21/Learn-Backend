import mongoose from "mongoose";

function connectTodb() {
    const mongoUri = process.env.MONGODB_URL;

    if (!mongoUri) {
        console.error("MONGODB_URL is not set. Add it to your .env file.");
        process.exit(1);
    }

    mongoose
        .connect(mongoUri)
        .then(() => {
            console.log("Connected to db");
        })
        .catch((err) => {
            console.log("Something wrong", err);
        });
}

export default connectTodb;