// Initializes the `emails` service on path `/emails`
const createService = require('feathers-mailer');
const mailgun = require('nodemailer-mailgun-transport');
const hooks = require('./emails.hooks');
const filters = require('./emails.filters');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/emails', createService(mailgun(app.get('mailgun'))));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  service.hooks(hooks);

  if(service.filter)
    service.filter(filters);
};
