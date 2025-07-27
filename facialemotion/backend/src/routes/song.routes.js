const express = require('express')
const multer = require('multer')
const router = express.Router()
const uploadFile = require('../service/storage.service.js')




const upload = multer({ storage: multer.memoryStorage() })


/* 

title
artist
audio
This file handles the routes for song-related operations.

*/



router.post('/songs',upload.single('audio'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file);
    console.log(fileData);
    res.status(200).json({
        message: 'Song added successfully',
        song: req.body
    });
});

module.exports = router;