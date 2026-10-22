const app = require("./src/app")
const config = require("./src/config")
const connectDb = require("./src/db/db")

connectDb();









app.listen(config.PORT, () =>{
  console.log(`server is running on port:${config.PORT}`)
  
})





