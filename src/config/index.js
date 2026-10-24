require("dotenv").config()

// ============================================================
// ENVIRONMENT VARIABLES - TWO WAYS TO CONFIGURE EMAIL
// ============================================================

// WAY 1: OAuth2 Configuration (Previous Method )
// Required for OAuth2 method:
// - CLIENT_ID: From Google Cloud Console
// - CLIENT_SECRET: From Google Cloud Console
// - REFRESH_TOKEN: Generated from OAuth2 flow
/*
const required = [
"PORT",
 "JWT_SECRET",
 "MONGO_URI",
 "EMAIL_USER",
 "CLIENT_ID",
 "CLIENT_SECRET",
 "REFRESH_TOKEN"
]
*/

// WAY 2: App Password Configuration (Current Method - Active)
// Required for App Password method:
// - EMAIL_USER: Your Gmail address
// - EMAIL_APP_PASSWORD: Generated from Gmail App Passwords
const required = [
"PORT",
 "MONGO_URI",
 "EMAIL_USER",
 "EMAIL_APP_PASSWORD"
]
  


required.forEach((key) =>{

if(!process.env[key]) {
  console.log(`${key} is missing`);
  process.exit(1);
}

})



const config = {
    PORT:process.env.PORT,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_APP_PASSWORD:process.env.EMAIL_APP_PASSWORD,

    // OAuth2 config (for reference - not currently used)
    // CLIENT_ID:process.env.CLIENT_ID,
    // CLIENT_SECRET:process.env.CLIENT_SECRET,
    // REFRESH_TOKEN:process.env.REFRESH_TOKEN
}

// Debug: Check if email config is loaded
console.log('Email config check:');
console.log('EMAIL_USER:', config.EMAIL_USER ? '✅ Set' : '❌ Missing');
console.log('EMAIL_APP_PASSWORD:', config.EMAIL_APP_PASSWORD ? '✅ Set' : '❌ Missing');


module.exports = config;



