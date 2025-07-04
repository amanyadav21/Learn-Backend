const express = require('express');

const app = express(); // Server created here

app.use(express.json());

const notes = []; // ✅ Define the array to store notes

app.post('/notes', (req, res) => {
    console.log(req.body);

    notes.push(req.body); // ✅ Now it will work
    res.json({
        message: "Notes are created Right Now"
    });
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.listen(3000, () => {
    console.log('Your server is ready for testing the page');
});
