const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send("Hello aman Bhai")
});

app.get('/home', (req, res) =>{
    res.send("Home page are their")
});

app.get('/about', (req, res) => {
    res.send("About section are their")
});


app.listen(3000, () => {
    console.log("Server is ruuning in 3000 port")
});