const mongoose = require('mongoose')

// Create schema of notes
const noteSchema = new mongoose.Schema({
    title:String,
    content:String,
})

// Create model of notes

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel


