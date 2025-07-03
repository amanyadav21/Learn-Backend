const express = require('express')

const app = express() /// --- server create hogya hai
app.use(express.json())

app.post('/notes',(req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.json({
        message: "Note added sucessfully",
        notes: notes
    })
})

app.listen(3000, () => {
    console.log('Your app is live Now at time')
})