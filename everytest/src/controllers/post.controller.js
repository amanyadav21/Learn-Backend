import postModel from "../models/post.model.js";
import generateCaption from "../service/ai.service.js";
import { uploadImage } from "../service/storage.service.js";
import { v4: uuidv4 } from 'uuid' 


export const createPostController = async (req, res) => {
    try {
        const file = req.file; // multer puts the uploaded file here

        if (!file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const base64ImageFile = file.buffer.toString("base64");

        const caption = await generateCaption(base64ImageFile);
        const uploadResult = await uploadImage(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption: caption,
            image: result.url,
            user: req.user._id
        })

        // TODO: save caption + imageUrl to Mongo via postModel
        return res.status(201).json({
            caption,
            imageUrl: uploadResult.url,
            result
        });
    } catch (error) {
        console.error("Failed to create post:", error);
        return res.status(500).json({ message: "Failed to create post" });
    }
};



