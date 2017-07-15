const users = require('./users/users.service.js');
const events = require('./events/events.service.js');
const rules = require('./rules/rules.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(events);
  app.configure(rules);
};
