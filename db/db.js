const mongoose = require('mongoose');
require('dotenv').config();

const DBConnection = async () => {

    const MONGO_URI = process.env.MONGO_URI;
    try {
        console.log("connecting1")
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        //console.log("connecting1")
        console.log('Database connected successfully for the second time');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

module.exports = { DBConnection };