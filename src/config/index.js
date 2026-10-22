require("dotenv").config()


const required = [
"PORT",
 "JWT_SECRET",
 "MONGO_URI"
]
  


required.forEach((key) =>{

if(!process.env[key]) {
  console.log(`${key} is missing`);
  process.exit(1);
}

})



const config = {
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI
}


module.exports = config;



