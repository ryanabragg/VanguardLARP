const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const oauth2 = require('feathers-authentication-oauth2');
const FacebookStrategy = require('passport-facebook');

const verification = require('feathers-authentication-management');

const { iff } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;

const notifier = require('./notifier');

const isAction = () => {
  let args = Array.from(arguments);
  return hook => args.includes(hook.data.action);
};

module.exports = function () {
  const app = this;

  // Set up authentication with the secret
  const config = app.get('authentication');
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));

  app.configure(oauth2(Object.assign({
    name: 'facebook',
    Strategy: FacebookStrategy
  }, config.facebook)));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });

  // Set up authentication verification
  const configVerification = Object.assign(
    {},
    app.get('verification'), // config options object except .notifier
    notifier(app) // returns object with notifier prop
  );
  app.configure(verification(configVerification));

  // The `verification` service is used to manage verification tokens
  app.service('verification').hooks({
    before: {
      create: [
        iff(
          isAction('passwordChange', 'identityChange'),
          authenticate('jwt')
        )
      ]
    }
  });
};
