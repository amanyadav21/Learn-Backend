const express = require('express')
const connectToDB = require('./src/db/db.js')
const noteModel = require('./src/models/note.model.js')

const app = express()
app.use(express.json())



connectToDB()
app.post('/notes', async (req, res) => {
    const {title, content} = req.body

    console.log(title, content)

    await noteModel.create({
        title,content
    })

    res.json({
        messsage: "Note created sucessfully"
    })
})


app.get('/notes', async (req, res) => {
    const notes = await noteModel.find()
    res.json({
        message: "Note Fetch Successfully",
        notes: notes
    })
})

app.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;

    await noteModel.findOneAndDelete({
        _id: noteId
    });

    res.json({
        message: "Note deleted"
    });
});


app.patch('/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    const { title } = req.body;

    await noteModel.findOneAndUpdate(
        { _id: noteId },
        { title: title }
    );

    res.json({
        message: "Note update successfully"
    });
});





app.listen(3000,() => {
    console.log('Server is running at port 3000')
})