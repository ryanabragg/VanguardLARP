const accountService = require('../notifier');

module.exports = (options = {}) => hook => {
  if(!hook.params.provider)
    return hook;

  const user = hook.result;

  if(hook.app.get('mailgun').auth.api_key && hook.data && hook.data.email && user)
    accountService(hook.app).notifier('resendVerifySignup', user);

  return hook;
};