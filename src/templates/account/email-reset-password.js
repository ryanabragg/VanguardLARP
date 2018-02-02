const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hello, ${data.name}!</p>
    <p>There was a request to reset your password.</p>
    <a class="action" href="${data.link}">Reset Password</a>
    <p>If you ignore this email, your password will not change.</p>
    <p>If you didn't request this sign up please <a href="mailto:${data.email}?subject=I did not reset my password&body=Someone else requested the reset.">let us know</a>.</p>
    <p>Best regards,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
