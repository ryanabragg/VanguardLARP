const { checkContext, getByDot } = require('feathers-hooks-common');

module.exports = () => {
  const permissions = Array.from(arguments) || [];
  return hook => {
    checkContext(hook, 'before');
    if(!hook.params.provider)
      return true;
    if(!getByDot(hook, 'params.user.permissions'))
      return false;
    if(!permissions.some(p => hook.params.user.permissions.includes(p)))
      return false;
    return true;
  }
}
