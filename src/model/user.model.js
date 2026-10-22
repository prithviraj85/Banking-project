const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({

username:{
  type:String,
  required:[true,"username is necessary"],
  unique:true,
  maxLength:20,
  trim:true
},

//regex

email:{
  type:String,
  required:[true,"email is required"],
  unique:true,
  lowercase:true,
  trim:true,
  match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
},

password:{
  type:String,
  required:[true,"password is required"],
  minLength:[8,"password must be at least 8 charcter"],
  match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/, "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"],
  select:false
},

systemuser:{
type:Boolean,
default:false,
immutable:true,
select:false
},

},{timestamps:true})


const userModel = mongoose.model("user",userSchema)




module.exports = userModel;

