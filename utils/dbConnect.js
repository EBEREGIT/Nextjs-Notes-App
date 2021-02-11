const mongoose = require("mongoose");

const connection = {};

async function dbConnect() {
    // continue if the db is already connected
    if(connection.isConnected){
        return
    }

    // connect db if it is not connected yet
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // show that db is connected here
    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected){
        console.log("Database Connected Successfully");
    }
}

export default dbConnect;