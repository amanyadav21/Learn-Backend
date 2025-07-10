const mongoose = require('mongoose')


function connectToDB() {
    mongoose.connect('mongodb+srv://testingproject:amanyadav@testingproject.1yltfvi.mongodb.net/testingproject')
    .then(() => {
        console.log('Database connected')
    })
}

module.exports = connectToDB