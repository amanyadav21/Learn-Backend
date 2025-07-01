const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('This is Main page Section');
});

app.get('/home', (req, res) => {
    res.send('This is home page');
});

app.get('/about', (req, res) => {
    res.send('This is your about page');
});

app.listen(3000, () => {
    console.log('Your server is start now');
});
