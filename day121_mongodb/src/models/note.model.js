const mongoose = require("mongoose")


// schema 
const noteSchema = new mongoose.Schema({
    title:String,
    content:String
})


// Model

const noteModel = mongoose.model("note", noteSchema)

module.exports = noteModel