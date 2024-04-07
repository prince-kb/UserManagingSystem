const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.REACT_APP_MONGO
async function connectToMongo() {
    await mongoose.connect(mongoURL)
    .then(()=> console.log("Connected to Database successful"))
    .catch(err => console.log(`Cannot connect as mongo url does not exist `+err));
  }
module.exports=connectToMongo;