const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect('mongodb+srv://kumaryadavaman93:AehhT633HyVqUWec@kyabhai.hzfqhxb.mongodb.net/kyabhai')
    .then(() => {
        console.log('Le bhai Connection Build Now')
    })
}

module.exports = connectToDB