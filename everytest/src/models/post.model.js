import mongoose from "mongoose";

// Post schema define karte hain jisme post ke data honge
const postSchema = new mongoose.Schema({
    // Post ki image URL store karega
    image: String,
    
    // Post ke saath jo caption likha hai wo store karega
    caption: String,
    
    // Jo user ne ye post likha hai uska ID store karega
    // ObjectId = MongoDB ke ID format mein
    // ref: "users" = ye users collection se linked hai
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

// Post model create karte hain database mein "post" collection ke liye
const postModel = mongoose.model("post",postSchema)

// Model ko export karte hain taki dusri files mein use kar saken
export default postModel;