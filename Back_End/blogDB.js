const mongoose = require('mongoose')

const URL = "mongodb://127.0.0.1:27017/Blog_Data"

const ConnectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('connection established');
    } catch (error) {
        console.error('cannot connect to db');
        process.exit(0);
    }
}


module.exports = ConnectDB;