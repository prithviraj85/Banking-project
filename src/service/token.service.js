const config = require("../config/index")
const jwt = require("jsonwebtoken")



function generateAccessToken (payload) {
return jwt.sign({payload},config.ACCESS_TOKEN_SECRET,
  {expiresIn:"15m"}
)
}

function genrateRefreshToken(payload) {
 return jwt.sign({payload},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
}

function verifyAccessToken(token) {
  return jwt.verify(token,config.ACCESS_TOKEN_SECRET)

}

function verifyRefreshToken(token) {
  return jwt.verify(token,config.REFRESH_TOKEN_SECRET)
}



module.exports = {generateAccessToken,genrateRefreshToken,verifyAccessToken,verifyRefreshToken}