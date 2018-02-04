const {
  disallow,
  discard,
  iff,
  isProvider,
  preventChanges,
  unless, 
  validateSchema
} = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;
const { queryWithCurrentUser, restrictToRoles } = require('feathers-authentication-hooks');
const { addVerification, removeVerification } = require('feathers-authentication-management').hooks;
const { hashPassword } = require('feathers-authentication-local').hooks;
const Ajv = require('ajv');

const hasPermission = require('../../hooks/has-permission');
const sendVerificationEmail = require('../../hooks/send-verification-email');

const schema = require('./users.schema.json');
const patchSchema = Object.assign({}, schema, {required: []});

const restrict = [
  authenticate('jwt'),
  restrictToRoles({
    roles: ['logistics', 'admin'],
    fieldName: 'permissions',
    idField: '_id',
    ownerField: '_id',
    owner: true
  })
];

const setInitialData = () => hook =>
  hook.app.service('/users')
  .find({paginate: false, query: {$limit: 1}})
  .then(data => {
    if(data.length === 0)
      hook.data.permissions = [ 'admin' ];
    else
      hook.data.permissions = [];
    hook.data.preferredComm = 'email';
    hook.data.isVerified = false;
    hook.data.verifyToken = null;
    hook.data.verifyShortToken = null;
    hook.data.verifyExpires = 0;
    hook.data.verifyChanges = {};
    hook.data.resetToken = null;
    hook.data.resetShortToken = null;
    hook.data.resetExpires = 0;
    return hook;
  })
  .catch(error => hook);

const removeSensitiveData = [
  discard(
    'password',
    'verifyToken',
    'verifyShortToken',
    'verifyExpires',
    'verifyChanges',
    'resetToken',
    'resetShortToken',
    'resetExpires'
  )
];

module.exports = {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      unless(
        hasPermission('logistics', 'admin'),
        queryWithCurrentUser({ idField: '_id' })
      )
    ],
    get: [ ...restrict ],
    create: [
      hashPassword(),
      setInitialData(),
      addVerification('verification'),
      validateSchema(schema, Ajv, { coerceTypes: true })
    ],
    update: [ disallow('external') ],
    patch: [
      ...restrict,
      validateSchema(patchSchema, Ajv, { coerceTypes: true }),
      iff(
        isProvider('external'),
        preventChanges(
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        )
      )
    ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      iff(
        hook => hook.params.provider,
        ...removeSensitiveData
      )
    ],
    find: [],
    get: [],
    create: [
      sendVerificationEmail(),
      removeVerification(),
      ...removeSensitiveData
    ],
    update: [ ...removeSensitiveData ],
    patch: [ ...removeSensitiveData ],
    remove: [ ...removeSensitiveData ]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
