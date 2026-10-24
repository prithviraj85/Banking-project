const nodemailer = require('nodemailer')

// ============================================================
// EMAIL CONFIGURATION - TWO WAYS TO CONFIGURE GMAIL
// ============================================================

// WAY 1: Using OAuth2 (Previous Method - Currently Commented)
// Note: OAuth2 requires Gmail Cloud Console setup and refresh tokens
// which can expire or get revoked. More secure but more complex.
/*
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    type:'OAuth2',
    user:process.env.EMAIL_USER,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    refreshToken:process.env.REFRESH_TOKEN
  },
  pool:true,
  maxConnections:5,
  maxMessages:100,
  defaults:{
    from:`"Raaz Bank" <${process.env.EMAIL_USER}>`
  }
})
*/

// WAY 2: Using App Password (Current Method - Active)
// Note: Simpler approach using Gmail App Password.
// Requires 2-factor authentication enabled on your Gmail account.
// Generate app password from: https://myaccount.google.com/apppasswords
// Pros: Simple, doesn't expire, easy to regenerate
// Cons: Less secure than OAuth2 for production apps
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_APP_PASSWORD
  },
  pool:true,
  maxConnections:5,
  maxMessages:100,
  defaults:{
    from:`"Raaz Bank" <${process.env.EMAIL_USER}>`
  }
})

//verify mailer
async function verifyMailer() {
  try {
    await transporter.verify();
    console.log('✅ Email server ready');
  } catch (error) {
    console.error('❌ Email server verification failed:', error.message);
    throw error;
  }
}

const sendEmail = async (to,subject,text,html) =>{
  try {
    const info = await transporter.sendMail({
      to,
      subject,
      text,
      html
    })

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return { success: false, error: error.message };
  }
}



module.exports = {verifyMailer,sendEmail}











