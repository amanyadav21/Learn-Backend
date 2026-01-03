import mongoose from "mongoose";

/* ========================================
   User Schema Definition
   ======================================== */
// Mongoose schema define kar rahe hain user ke liye
// Schema database mein data ka structure define karta hai
const userSchema = new mongoose.Schema({
    username: String,  // User ka unique username
    password: String,  // User ka password (Note: Production mein hash karke store karo)
});

/* ========================================
   User Model Creation
   ======================================== */
// Schema se model bana rahe hain
// Model database operations (create, find, update, delete) ke liye use hota hai
// "user" - MongoDB collection ka naam
const userModel = mongoose.model("user", userSchema);

// Model export kar rahe hain taaki routes mein use kar sakein
export default userModel;