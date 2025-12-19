const express = require("express");
const connectToDB = require('./src/db/db.js')



connectToDB()
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
    res.json("Bhai kam kar rha hai")
})


app.post('/notes', (req, res) => {
    const {title, content} = req.body
    console.log(title, content)

    res.json("Bhai server py data mil gya frontend se - thanku")
})



app.listen(3000, (req, res) => {
    console.log("Server is start on port No 3000")
})