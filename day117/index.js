const express = require("express");

const app = express();

// this is middleware - joh agar tumko body mai data chahiye toh express.json middleware ka use karna hoga
app.use(express.json());

let notes = [];

app.post('/notes', (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message: "Notes added successfully",
        notes: notes
    })
})



app.listen(3000, () => {
    console.log("Server is start on port No 3000")
});