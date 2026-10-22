const {verifyAccessToken} = require('../service/token.service')


function authUser () {

  try {
    const {token} = req.cookies.accessToken;

if (!token) {
  return res.status(401).json({
    message:"no token provided"
  })
}

const decoded = verifyAccessToken(token)
req.user = decoded;
next()


  } catch (error) {
//token expires
    if(error.name === "TokenExpiredError"){
      return res.status(401).json({
        message:"token expired",
        code:"TOKEN_EXPIRED"
      })
    }


    return res.status().json({
      message:"invalid token"
    })
  }


}



module.exports = authUser

//export default authentication              



