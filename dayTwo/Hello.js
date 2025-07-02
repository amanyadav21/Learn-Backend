const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.end('Home Page Section')
})

app.get('/home/about', (req, res) => {
    res.end('This is Home and -- About section bhia chal rha hai ku dek rhe hai')
})

app.get('/home/about/aman', (req, res) => {
    res.end('Home -> About -> Aman✅')
})


app.listen(3000, () => {
    console.log('this new server start now✅')
})