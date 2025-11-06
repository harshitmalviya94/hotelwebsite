const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initdata = require('./data');


const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("Database initialization complete. Connection closed.");
})
.catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await initDB();
    await mongoose.connection.close();
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log('Database was initialized');
};
