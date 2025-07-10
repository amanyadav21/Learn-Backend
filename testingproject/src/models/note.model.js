const mongoose = require('mongoose')
const { type } = require('os')

const noteSchema = mongoose.Schema({
    title: {
        type:String,
        require: true
    },
    content: {
        type:String,
        require: true
    }
})

const noteModel = mongoose.model("collection",noteSchema);

module.exports = noteModel