const express =  require('express')
const connectToDB = require('./src/db/db.js')

const app = express()
app.use(express.json())

connectToDB()



app.get('/',(req, res) => {
    res.send('Hello World')
})



app.listen(3000,() => {
    console.log('Your server is start at 3000 port')
})