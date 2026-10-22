const express = require("express")

const authRouter = express.Router();
const {register,login,logout,refresh} = require("../controller/auth.controller")


authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("refresh",refresh)
authRouter.post("/logout",logout)







module.exports = authRouter