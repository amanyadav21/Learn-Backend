const express = require('express')
const connectToDB = require('./src/db/db.js')


connectToDB()
const app = express()
app.use(express.json())


app.get('/',(req, res) => {
    res.send('Hello World at -> Manual Port Number')
})

app.post('/notes',(req, res) => {
    const {title, content} = req.body
    console.log(title, content)
    // console.log(req.body)
})

app.listen(3000,() => {
    console.log('Your Server is ready at 3000 Port')
})