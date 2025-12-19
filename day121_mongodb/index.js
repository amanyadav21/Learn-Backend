const express = require("express");
const connectToDB = require('./src/db/db.js')
const noteModel = require("./src/models/note.model.js")




const app = express();
app.use(express.json())



// POST - Create a new note with title and content
app.post('/notes',async(req, res) => {
    const {title, content} = req.body
    console.log(title, content)

    await noteModel.create({
        title,content
    })

    res.json ({
        message: "Note created"
    })
})

// GET - Fetch all notes from database
app.get('/notes', async(req, res) => {
    const notes = await noteModel.find({})
    
    res.json({
        notes
    })
})

// DELETE - Remove a note by ID
app.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id

    await noteModel.findByIdAndDelete({
        _id : noteId
    })

    res.json({
        message: "Note Deleted"
    })
})

// PATCH - Update note title by ID
app.patch('/notes/:id', async (req, res) => {
    const noteId = req.params.id
    const {title} = req.body

    await noteModel.findOneAndUpdate({
        _id:noteId  
    },{
        title:title
    })
    res.json({
        message: "Note updated sucessfully"
    })
})

connectToDB()

app.listen(3000, (req, res) => {
    console.log("Server is start on port No 3000")
})