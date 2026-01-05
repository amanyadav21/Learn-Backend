import postModel from "../models/post.model.js";
import generateCaption from "../service/ai.service.js";


export const createPostController = async (req, res) => {
    const file = req.file;
    console.log("File received:", file);

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')


    const caption = await generateCaption(base64ImageFile)
    
    console.log(caption)


    // TODO: implement actual post creation with postModel
    return res.status(201).json({
        caption
    });
};



