const express = require("express");

const app = express();

app.use(express.json());


let notes = [];


app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message: "Notes has been added",
        notes: notes
    })
})

app.get('/notes', (req, res) => {
    res.json(notes)
})


// DELETE /notes/:0
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index
    delete notes[index]
    res.json({
        message: "Notes deleted successfully",
    })
})

// PUTCH - update method that is use to update data at sever

app.patch('/notes/:index',(req, res) =>{
    const index = req.params.index
    const {title} = req.body

    notes[index].title = title

    res.json({
        message: "Notes updated successfully",
    })
})



app.listen(3000, () => {
    console.log("Server is running on 3000 port");
})