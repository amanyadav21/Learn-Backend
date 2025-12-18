const express = require("express");
const { timeLog } = require("node:console");

const app = express();

app.use(express.json());


let notes = []


// POST Method - to send data frontent fo server(backend)
app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)

    res.json({
        message: "Note added sucessfully",
        notes: notes
    })
})

app.get('/notes', (req, res) => {
    res.json(notes)
})


app.delete('/notes/:index', (req, res) => {
    const index = req.params.index
    delete notes[index]
    res.json({
        message: "Bhai delete kar diya hai thik hai"
    })
})


app.patch('/notes/:index', (req, res) => {
    const index = req.params.index
    const {title} = req.body
    
    notes[index].title = title

    res.json({
        message: "notes updated",
    })
})

app.listen(3000, () => {
    console.log("server Is Running on Port 3000")
})