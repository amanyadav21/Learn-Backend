const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect("mongodb+srv://kumaryadavaman93_db_user:zQAfivOCIjFuf6Jz@everytest.xch7d9m.mongodb.net/notes")
    .then(() => {
        console.log("Connect to DB")
    })
}


module.exports = connectToDB