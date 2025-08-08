const express = require('express')
const app =  express()


app.use(function(req, res, next) {
    // next()
})




app.get('/',(req, res) => {
    res.send('Ha Bhai teri request ayi hai sever tak')
})





app.listen(3000, () => {
    console.log('This sever is start on PORT - 3000')
})