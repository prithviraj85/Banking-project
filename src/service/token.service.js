const config = require("../config/index")
const jwt = require("jsonwebtoken")



function generateAccessToken (payload) {
jwt.sign({payload},config.JWT_SECRET ,
  {expiresIn:"15m"}
)
}









module.exports ={generateAccessToken}