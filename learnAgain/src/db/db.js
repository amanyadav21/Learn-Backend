const mongoose = require('mongoose')

function connectToDB () {
    mongoose.connect('mongodb+srv://kumaryadavaman93:WikdEFraY3T96u4o@cluster0.ec6sujh.mongodb.net/Cohortone')
    .then(() => {
        console.log('Connected Sucessfully')
    })
}

module.exports = connectToDB