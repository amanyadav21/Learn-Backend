import express from 'express'
import multer from 'multer';
import uploadFile from '../service/storage.service.js';
const router = express.Router();
import songModel from '../models/song.models.js';



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

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })


    console.log(fileData);
    res.status(201).json({
        message: "Song created successfully",
        song: song
    });




})


// get method is used to send data backend to frontend
router.get('/songs', async (req, res) => {
    try {
        const {mood} = req.query; // we consider mood = sad

        console.log("Fetching songs for mood:", mood);

        const songs = await songModel.find({
            mood: mood
        });

        res.status(200).json({
            message: "Songs fetched successfully",
            mood: mood,
            totalSongs: songs.length,
            songs: songs
        });
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({
            message: "Error fetching songs",
            error: error.message
        });
    }
});



export default router