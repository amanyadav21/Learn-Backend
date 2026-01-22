import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
    }
}, {
    // iske mtb hota hai user name kub create kiya the or last time kub update kiya the
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

export default userModel