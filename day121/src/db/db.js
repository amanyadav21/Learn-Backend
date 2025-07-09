const mongoose =  require('mongoose')


function connectToDB() {
    mongoose.connect("mongodb+srv://amanyadav21:0NZN5azowaSJ00HQ@cluster0.caealb0.mongodb.net/cohort")
    .then(() => {
        console.log("Connect TO DB")
    })
}

module.exports = connectToDB