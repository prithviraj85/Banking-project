const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const {generateAccessToken }= require("../service/token.service")


//register

async function register(req,res) {

const {username,email,password} = req.body;

if(!username || !email || !password) {
  res.status(400).json({
    message:"usernme,password and email are required"
  })
}

const isAlreadyExist = userModel.find({
  $or:[{email},{username}]
})

if(isAlreadyExist) {
return res.status(409).json({
  message:"user is already exist"
})
}

const hash = bcrypt.hash(password,10)

userModel.create({
  username,
  email,
  password:hash
})

//token

const accessToken = generateAccessToken({
  Id:user._id,
  user:user.username

})






}


async function login (req,res) {
console.log("reached on login page");

}



async function logout (req,res) {
console.log("reached on logout page");

}

module.exports = {register,login,logout}