const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.end('This is Home section')
})

app.get('/home',(req, res) => {
    res.end('This is New Home page section')
})

app.get('/about',(req, res) => {
    res.end('This is about section')
})

app.get('/blog',(req, res) => {
    res.end('This is Blog section at section')
})

app.get('/carrer', (req, res) => {
    res.end('This is carrer section')
})
app.listen(3000, () => {
    console.log('Port are Start Now')
})