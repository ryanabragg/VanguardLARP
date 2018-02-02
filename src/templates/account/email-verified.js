const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hello again, ${data.name}!</p>
    <p>Your email address has been verified.</p>
    <p>Thank you,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
