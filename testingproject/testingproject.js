const express = require('express')
const connectToDB = require('./src/db/db.js')
const noteModel = require('./src/models/note.model.js')


const app =  express()
connectToDB()
app.use(express.json())


// --> Post Notes
app.post('/notes',async(req, res)=> {
    const {title, content} = req.body
    console.log(title, content)

    await noteModel.create({
        title, content
    })
    res.json({
        message:"Note is created"
    })
})

// --> Get Notes
app.get('/notes', async(req, res) => {
    const getNote = await noteModel.find()

    res.json({
        message: "Your notes is fetch Now",
        notes: getNote
    })
})


// --> Delete Note

app.delete('/notes/:id',async (req, res) => {
    const deleteId = req.params.id

    await noteModel.findOneAndDelete({
        _id:deleteId
    })
    res.json({
        message: "Notes Deleted"
    })

})

// --> Updation section - patch()


app.patch('/notes/:id',async(req, res) => {
    const noteId = req.params.id
    const {title} = req.body

    await noteModel.findOneAndUpdate(
        {_id: noteId},
        {title: title}
    )
    res.json({
        message: 'Your Note is updated'
    })
})

app.listen(3000,() => {
    console.log("Server is start at 3000 port")
})