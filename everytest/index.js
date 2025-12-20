const express = require("express");
const connectToDB = require('./src/db/db.js')
const nodeModel = require('./src/models/note.model.js');
const noteModel = require("./src/models/note.model.js");



const app = express()
app.use(express.json())


app.post('/notes', async (req, res) => {
    const {title, content} = req.body
    console.log(title, content)

    await noteModel.create({
        title, content
    })
    res.json({
        message: "Note created"
    })
})




app.get('/notes', async (req, res) => {
    const notes = await noteModel.find({})

    res.json({notes})
})




app.delete('/notes/:id', async(req, res) => {
    const noteId = req.params.id
    await noteModel.findByIdAndDelete({
        _id: noteId
    })

    res.send({
        message: "Delete ho gya hai"
    })
})


app.patch('/notes/:id', async (req, res) => {
    const noteId = req.params.id
    const {title} = req.body

    await noteModel.findOneAndUpdate({
        _id:noteId
    }, {
        title:title
    })

    res.json({
        message: "Note updated sucessfully"
    })
})

connectToDB()


app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000")
})