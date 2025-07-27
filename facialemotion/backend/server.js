require('dotenv').config()
const express = require('express');
const connectDB = require('./src/db/db.js');
const songRoutes = require('./src/routes/song.routes.js');

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', songRoutes);






app.listen(3000, () => {
    console.log('Server is start')
})