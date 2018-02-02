const serverURL = require('./util/server-url');

const verification = require('./templates/account/email-verification');
const verified = require('./templates/account/email-verified');
const resetPwdRequest = require('./templates/account/email-reset-password');
const resetPwdDone = require('./templates/account/email-reset-password-done');
const passwordChanged = require('./templates/account/email-password-changed');
const identityChanged = require('./templates/account/email-identity-changed');

module.exports = (app) => {
  const contact_email = app.get('email').contact;

  return {
    notifier: (type, user, options) => {
      let email = {
        from: app.get('email').sender,
        to: user.email,
        'h:Reply-To': contact_email
      };
      switch(type){
      case 'resendVerifySignup':
        email.subject = 'Confirm Signup';
        email.html = verification({
          name: user.name,
          link: `${serverURL}/account/verify/${user.verifyToken}`,
          email: contact_email
        });
        break;
      case 'verifySignup':
        email.subject = 'Thank you, your email has been verified';
        email.html = verified({
          name: user.name
        });
        break;
      case 'sendResetPwd':
        email.subject = 'Password reset requested';
        email.html = resetPwdRequest({
          name: user.name,
          link: `${serverURL}/login/reset/${user.resetToken}`,
          email: contact_email
        });
        break;
      case 'resetPwd':
        email.subject = 'Your password was reset';
        email.html = resetPwdDone({
          name: user.name
        });
        break;
      case 'passwordChange':
        email.subject = 'Your password was changed';
        email.html = passwordChanged({
          name: user.name,
          email: contact_email
        });
        break;
      case 'identityChange':
        email.subject = 'Your account information was updated.';
        email.html = identityChanged({
          name: user.name,
          changes: user.verifyChanges,
          link: `${serverURL}/account/verify/${user.verifyToken}`,
          email: contact_email
        });
        break;
      default:
        return Promise.resolve();
      }
      return app.service('emails').create(email).then(result => {
        console.log('Sent email', result);
      }).catch(error => {
        console.log('Error sending email', error);
      });
    }
  };
};
