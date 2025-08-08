const express = require('express')
const app =  express()


// app.use(function(req, res, next) {
//     console.log('Middlewere working now')
//     next()
// })




app.get('/',(req, res) => {
    res.send('Ha Bhai teri request ayi hai sever tak')
    console.log(req)
})

app.get('/profile',function(res, req) {
    req.send('Hello form Profile')
})

app.get('/profile/:username', function(req, res) {
    res.send(`Hello from ${req.params.username}`)
})





app.listen(3000, () => {
    console.log('This sever is start on PORT - 3000')
})