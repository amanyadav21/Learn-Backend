const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect("mongodb+srv://kumaryadavaman93_db_user:jvJhDJ7Ry4PuxRnH@day121.ivsyogj.mongodb.net/day121")
    .then(() => {
        console.log("connect to DB");
    })
}


module.exports = connectToDB