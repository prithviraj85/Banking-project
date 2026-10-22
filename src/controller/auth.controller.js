const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const {generateAccessToken,genrateRefreshToken,verifyAccessToken,verifyRefreshToken}= require("../service/token.service")


//register

async function register(req,res) {

const {username,email,password} = req.body;

if(!username || !email || !password) {
  return res.status(400).json({
    message:"username,password and email are required"
  })
}

const isAlreadyExist = await userModel.findOne({
  $or:[{email},{username}]
})

if(isAlreadyExist) {
return res.status(409).json({
  message:"user is already exist"
})
}

const hash = await bcrypt.hash(password,10)

const user = await userModel.create({
  username,
  email,
  password:hash
})

//token

const accessToken = generateAccessToken({
  id:user._id,
  username:user.username

})

return res.status(201).json({
  message:"user registerd successfully",
  user:{
    _id:user._id,
    email:user.email,
    username:user.username
  },
  accessToken
})


}

/*
* - user login controller
* - Post /api/auth/login
*/

async function login (req,res) {
try {
  console.log("reached on login page");


const {email,password} = req.body;

if(!email || !password) {
return res.status(400).json({
  message:"all fields required"
})
}

//find user
const user = await userModel.findOne({email}).select("+password");
if(!user) {
return res.status(404).json({
  message:"user not found",
  success:false,
})
}

//check password
const isValidPassword = await bcrypt.compare(password,user.password)

if(!isValidPassword) {
  return res.status(401).json({
    message:"invalid email or password"
  })
}

//token 

const accessToken = generateAccessToken({id:user._id,username:user.username})

const refreshToken = genrateRefreshToken({
  id:user._id
})

//save refresh in db
user.refreshToken = refreshToken;
await user.save()

//set cookie

//res.cookie('accessToken', accessToken, options);


res.cookie('accessToken', accessToken,{
httpOnly:true,
maxAge:15 * 60 * 1000  //15min
})

res.cookie('refreshToken',refreshToken, {
  httpOnly:true,
  maxAge: 7 * 24 * 60 * 60 * 1000 //7days
})


return res.status(200).json({
message:"logged in successfully",
user:{
id:user._id,
username:user.username,
email:user.email
}
})


} catch (error) { return res.status(500).json({
  message:error.message
})
  
}

}

//refresh token

async function refresh(req,res) {

try {
  const refreshToken = req.cookies.refreshToken;

if (!refreshToken) {
  return res.status(401).json({
    message:"no refresh token"
  })
}
//verify

let decoded;

try {
  decoded = verifyRefreshToken(refreshToken)

} catch (error) {
  return res.status(401).json({
    message:"invalid refresh token"
  })
}

//find user

const user = await userModel.findById(decoded.id)

if (!user) {
  return res.status(401).json({
    message:"user not found"
  })
}

//check in db match

if (refreshToken !== user.refreshToken) {
  user.refreshToken = null;
  await user.save();

  return res.status(401).json({
    message:"token reuse detected"
  })
}

//new token generate (rotation)

const newAccessToken = generateAccessToken({
  id:user._id,
  username:user.username
})

const newRefreshToken = generateRefreshToken({
  id:user._id
})

//refresh token update in db

user.refreshToken = newRefreshToken;
await user.save();


//set cookies


res.cookie('accessToken',newAccessToken,{
  httpOnly: true,
  maxAge: 15 * 60 * 1000,  //15m
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" 
})

res.cookie('refreshToken',newRefreshToken,{
  httpOnly:true,
  maxAge:7 * 24 * 60 * 60 * 1000, //7d
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" 
})


return res.status(200).json({
  message:"token refreshed"
})

} catch (error) {
  return res.status(500).json({
    message:error.message
  })
}

}





async function logout (req,res) {
console.log("reached on logout page");

}

module.exports = {register,login,refresh,logout}