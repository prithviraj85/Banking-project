
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function welcomeEmail(username) {
  const name = escapeHtml(username || "there");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Your Bank</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;color:#172033;">

  <div style="display:none;max-height:0;overflow:hidden;
  opacity:0;color:transparent;">
    Welcome aboard! Your account is ready.
  </div>

  <table role="presentation" width="100%" cellspacing="0"
  cellpadding="0" border="0" style="background:#f1f5f9;">
    <tr>
      <td align="center" style="padding:30px 12px;">

        <table role="presentation" width="600" cellspacing="0"
        cellpadding="0" border="0"
        style="width:100%;max-width:600px;background:#ffffff;
        border-radius:12px;overflow:hidden;">

          <tr>
            <td align="center"
            style="background:#10213b;padding:30px 20px;">
              <div style="font-size:27px;font-weight:bold;
              color:#ffffff;letter-spacing:1px;">
                YOUR BANK
              </div>
              <div style="font-size:11px;color:#b9c8dc;
              letter-spacing:2px;padding-top:9px;">
                BANKING MADE SIMPLE
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:35px 24px 12px;">
              <div style="font-size:48px;line-height:1.3;">
                &#10003;
              </div>
              <h1 style="margin:12px 0 8px;font-size:28px;
              line-height:1.3;color:#10213b;">
                Welcome aboard!
              </h1>
              <p style="margin:0;color:#64748b;font-size:15px;">
                We're glad you're here.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 28px 10px;
            font-size:15px;line-height:1.8;color:#475569;">
              <p style="margin:0 0 16px;">Hi ${name},</p>

              <p style="margin:0 0 16px;">
                Welcome to <strong>YOUR BANK!</strong>
                Your account has been created successfully,
                and we're excited to have you with us.
              </p>

              <p style="margin:0 0 20px;">
                We believe banking should feel simple, secure,
                and transparent. We're here to help you manage
                your account with confidence.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 20px;">
              <table role="presentation" width="100%"
              cellspacing="0" cellpadding="0" border="0"
              style="background:#f1f5f9;border-radius:10px;">
                <tr>
                  <td style="padding:18px 16px;
                  font-size:14px;line-height:1.7;color:#475569;">
                    <strong style="color:#10213b;">
                      &#10003; Security comes first
                    </strong><br>
                    Keep your password and OTP private.
                    We'll never ask you to share them by email.
                    <br><br>

                    <strong style="color:#10213b;">
                      &#10003; Your account, your control
                    </strong><br>
                    Sign in to explore the features available
                    in your account.
                    <br><br>

                    <strong style="color:#10213b;">
                      &#10003; We're here to help
                    </strong><br>
                    Contact our support team whenever you need
                    assistance.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:8px 24px 28px;">
              <a href="https://example.com"
              style="display:inline-block;background:#10213b;
              color:#ffffff;text-decoration:none;font-size:15px;
              font-weight:bold;padding:15px 28px;border-radius:7px;">
                Explore Your Account
              </a>
              <p style="font-size:12px;line-height:1.6;
              color:#64748b;margin:12px 0 0;">
                Replace this example link with your real website.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 24px;background:#f8fafc;
            font-size:13px;line-height:1.8;color:#64748b;">
              Warm regards,<br>
              <strong style="color:#10213b;">
                The Raaz BANK Team
              </strong>
              <hr style="border:0;border-top:1px solid #e2e8f0;
              margin:18px 0;">
              <div style="font-size:11px;text-align:center;">
               Please don't share your password or OTP with anyone.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = welcomeEmail;
