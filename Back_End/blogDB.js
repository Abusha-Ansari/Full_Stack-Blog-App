const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.DB_URI
const ConnectDB = async () => {
    try {
        console.log(URL)
        await mongoose.connect(URL);
        console.log('connection established');
    } catch (error) {
        console.error('cannot connect to db');
        process.exit(0);
    }
}


module.exports = ConnectDB;