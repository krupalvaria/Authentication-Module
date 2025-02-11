const mongoose = require("mongoose");

//function connection of mongodb

const databaseCollection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connection success ${mongoose.connection.host}`)

    } catch (error) {
        console.log("Database connection error")
    }
}

module.exports = databaseCollection;