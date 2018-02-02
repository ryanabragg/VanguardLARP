const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hello again${data.name ? ', ' + data.name : ''}!</p>
    <p>Your password has been reset.</p>
    <p>If you didn't request this sign up please <a href="mailto:${data.email}?subject=I did not reset my password&body=Someone else completed the reset.">let us know</a>.</p>
    <p>Thank you,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
