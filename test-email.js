require("dotenv").config()
const { verifyMailer, sendEmail } = require("./src/service/email.service")

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
  console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '✅ Set' : '❌ Missing');

  try {
    await verifyMailer();
    console.log('✅ Email service is ready');

    // Test sending an email
    const result = await sendEmail(
      process.env.EMAIL_USER,
      'Test Email',
      'This is a test email from your banking app',
      '<h1>Test Email</h1><p>This is a test email from your banking app</p>'
    );
    console.log('Email result:', result);
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Full error:', error);
  }
}

testEmail().then(() => process.exit(0)).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
