import express from 'express'
import multer from 'multer';
import uploadFile from '../service/storage.service.js';

const router = express.Router();



// is from data mai joh vi data a rha hai usko ready kar sake this is actual use of multer 
const upload = multer({storage:multer.memoryStorage()});



router.post('/songs',upload.single("audio"),async(req, res) => {

    /*
    We share some important thing
    title
    artist
    audioFile
    */

    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file)
    console.log(fileData);
    res.status(201).json({
        message: "Song created successfully",
        song: req.body
    });

})




export default router