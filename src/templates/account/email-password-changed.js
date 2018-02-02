const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hi, ${data.name}!</p>
    <p>Your password was recently changed.</p>
    <p>If you did not request this, please <a href="mailto:${data.email}?subject=I did not change my password&body=Someone unauthorized changed my password.">let us know</a> and reset your password.</p>
    <p>Best regards,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
