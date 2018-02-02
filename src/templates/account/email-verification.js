const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hello, ${data.name}!</p>
    <p>Thank you for signing up. Please verify your email so you can reset your password if need be.</p>
    <a class="action" href="${data.link}">Verify Email</a>
    <p>You may still use the site if your email is unverified but we can't send you emails.</p>
    <p>If you didn't request this sign up please <a href="mailto:${data.email}?subject=I did not sign up at this site&body=Someone unauthorized signed up with my email.">let us know</a>.</p>
    <p>Best regards,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
