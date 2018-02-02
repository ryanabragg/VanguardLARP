const serverURL = require('../../util/server-url');
const head = require('../snippets/email-head');

module.exports = function(data) {
  return `
<!DOCTYPE html>
<html>
${head}
  <body>
    <p>Hi, ${data.name}!</p>
    <p>Your account was recently changed.</p>
    <ul>
      ${Object.getOwnPropertyNames(data.changes)
        .reduce((list, change) => list += `<li>${change}: ${data.changes[change]}</li>`, '')
      }
    </ul>
    <a class="action" href="${data.link}">Accept Changes</a>
    <p>If you did not request this, please <a href="mailto:${data.email}?subject=I did not change my account&body=Someone unauthorized changed my account.">let us know</a> and reset your password.</p>
    <p>Best regards,</p>
    <p class="signature">Vanguard LARP</p>
  </body>
</html>
`;
};
