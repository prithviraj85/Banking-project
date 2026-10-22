const mongoose = require("mongoose")
const config = require("../config/index")


async function connectDb() {
try {
  await mongoose.connect(config.MONGO_URI)
console.log("DB is connected successfully");
} catch (error) {
  console.log("db connection failed",error.message);
  process.exit(1);
  
}




}




module.exports = connectDb